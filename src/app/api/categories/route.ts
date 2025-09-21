import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Category } from "@/models/Category";

// Configure for static export
 

// ======================
// GET /api/categories
// - Get all categories (with ordering, pagination, search, and filtering)
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

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (status !== "") {
      query.status = status;
    }

    // Get total count for pagination
    const total_count = await Category.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Category.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        message: "Categories Retrieved",
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
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Categories", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Categories" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/categories
// - Create category
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, status } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    // Create new category
    const newCategory = new Category({
      name,
      status: status || 'active',
    });

    await newCategory.save();

    return NextResponse.json(
      { success: true, message: "Category created successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Category", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Category name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Category" },
      { status: 500 }
    );
  }
}
