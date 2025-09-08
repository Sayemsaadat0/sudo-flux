import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Service } from "@/models/Service";
import { Category } from "@/models/Category";

// ======================
// GET /api/services
// - Get all services (with ordering, pagination, search, and filtering)
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
    const category = searchParams.get("category") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across title, subTitle, description)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subTitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { statsString: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (category) {
      query.category = category;
    }

    // Get total count for pagination
    const total_count = await Service.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters, populate category
    const results = await Service.find(query)
      .populate('category', 'name status')
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        message: "Services Retrieved",
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          category,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Services", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Services" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/services
// - Create service
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subTitle, statsString, description, benefits, category } = body;

    if (!title || !subTitle || !statsString || !description || !benefits || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 400 }
      );
    }

    // Validate benefits is an array
    if (!Array.isArray(benefits) || benefits.length === 0) {
      return NextResponse.json(
        { success: false, message: "Benefits must be a non-empty array" },
        { status: 400 }
      );
    }

    // Create new service
    const newService = new Service({
      title,
      subTitle,
      statsString,
      description,
      benefits,
      category,
    });

    await newService.save();

    // Populate category in response
    await newService.populate('category', 'name status');

    return NextResponse.json(
      { success: true, message: "Service created successfully", service: newService },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Service", error);
    return NextResponse.json(
      { success: false, message: "Failed to create Service" },
      { status: 500 }
    );
  }
}
