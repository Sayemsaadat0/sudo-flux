import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Career } from "@/models/Career";

// ======================
// GET /api/careers
// - Get all careers (with ordering, pagination, search, and filtering)
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
    const department = searchParams.get("department") || "";
    const location = searchParams.get("location") || "";
    const type = searchParams.get("type") || "";
    const status = searchParams.get("status") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across title, description, department, location)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (department) {
      query.department = { $regex: department, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (type) {
      query.type = type;
    }
    if (status !== "") {
      query.status = status;
    }

    // Get total count for pagination
    const total_count = await Career.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Career.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Return results as-is
    const resultsWithUrls = results.map(career => career.toObject());

    return NextResponse.json(
      {
        success: true,
        message: "Careers Retrieved",
        results: resultsWithUrls,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          department,
          location,
          type,
          status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Careers", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Careers" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/careers
// - Create career
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract form fields
    const {
      title,
      department,
      location,
      type,
      description,
      responsibilities,
      requirements,
      status
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and Description are required" },
        { status: 400 }
      );
    }

    // Create new career instance
    const careerData = {
      title,
      department,
      location,
      type: type || "full_time",
      description,
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      status: status || "open",
    };

    const newCareer = new Career(careerData);
    await newCareer.save();

    return NextResponse.json(
      { success: true, message: "Career created successfully", career: newCareer },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Career", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Career" },
      { status: 500 }
    );
  }
}