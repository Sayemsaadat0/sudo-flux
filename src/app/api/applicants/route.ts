import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Applicant } from "@/models/Applicant";

// Configure for static export
export const dynamic = "force-static";
import { Career } from "@/models/Career";
import { put } from '@vercel/blob';

// ======================
// GET /api/applicants
// - Get all applicants (with ordering, pagination, search, and filtering)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "10");
    const limit = Math.min(per_page, 100); // Max 100 items per page
    const skip = (page - 1) * limit;

    // Search and filter parameters
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const careerId = searchParams.get("careerId") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name, email, phone)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (status) {
      query.status = status;
    }
    if (careerId) {
      query.careerId = careerId;
    }

    // Get total count for pagination
    const total_count = await Applicant.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Applicant.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Get career details for each applicant
    const resultsWithCareerDetails = await Promise.all(
      results.map(async (applicant) => {
        const applicantObj = applicant.toObject();
        try {
          const career = await Career.findById(applicant.careerId);
          return {
            ...applicantObj,
            career_details: career ? career.toObject() : null
          };
        } catch (error) {
          console.error(`Error fetching career for applicant ${applicant._id}:`, error);
          return {
            ...applicantObj,
            career_details: null
          };
        }
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Applicants Retrieved",
        results: resultsWithCareerDetails,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          status,
          careerId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Applicants", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Applicants" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/applicants
// - Create applicant
// ======================
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const careerId = formData.get("careerId") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !phone || !careerId) {
      return NextResponse.json(
        { success: false, message: "Name, email, phone, and career ID are required" },
        { status: 400 }
      );
    }

    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { success: false, message: "Resume file is required" },
        { status: 400 }
      );
    }

    // Validate file type (PDF, DOC, DOCX)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (1MB limit)
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (resumeFile.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 1MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = resumeFile.name.split(".").pop();
    const fileName = `applicants/${timestamp}_${randomString}.${fileExtension}`;

    // Upload to Vercel Blob Storage
    const blob = await put(fileName, resumeFile, {
      access: 'public',
    });

    // Create new applicant instance
    const applicantData = {
      name,
      email,
      phone,
      coverLetter: coverLetter || "",
      resumeFile: blob.url,
      careerId,
      status: "pending" as const,
    };

    const newApplicant = new Applicant(applicantData);
    await newApplicant.save();

    return NextResponse.json(
      { success: true, message: "Application submitted successfully", applicant: newApplicant },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Applicant", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Applicant" },
      { status: 500 }
    );
  }
}
