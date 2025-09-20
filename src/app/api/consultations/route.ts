import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Consultation } from "@/models/Consultation";

// Configure for static export
export const dynamic = "force-static";

// ======================
// GET /api/consultations
// - Get all consultations (with ordering, pagination, search, and filtering)
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
    const projectType = searchParams.get("projectType") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name, email, company, projectType, description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { projectType: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Add filters
    if (status !== "") {
      query.status = status;
    }
    if (projectType !== "") {
      query.projectType = { $regex: projectType, $options: "i" };
    }

    // Get total count for pagination
    const total_count = await Consultation.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Consultation.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        message: "Consultations Retrieved",
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          status,
          projectType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Consultations", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Consultations" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/consultations
// - Create consultation
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract form fields
    const { name, email, phone, company, projectType, budget, timeline, description } = body;

    if (!name || !email || !phone || !projectType || !budget || !timeline || !description) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const newConsultation = await Consultation.create({
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      description,
    });

    return NextResponse.json(
      { success: true, message: "Consultation request created successfully", consultation: newConsultation },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Consultation", error);
    return NextResponse.json(
      { success: false, message: "Failed to create Consultation" },
      { status: 500 }
    );
  }
}
