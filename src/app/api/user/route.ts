import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { User } from "@/models/User";

// Configure for static export
 

// ======================
// GET API
// - Get all users (with ordering, pagination, search, and filtering)
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
    const role = searchParams.get("role") || "";

    // Handle sorting
    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name and email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // Add filters
    if (role) {
      query.role = { $regex: role, $options: "i" };
    }

    // Get total count for pagination
    const total_count = await User.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await User.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { 
        success: true, 
        message: "Users Retrieved", 
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count
        },
        filters: {
          search,
          role
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Users", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Users" },
      { status: 500 }
    );
  }
}

// ======================
// POST API
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Name, Email, Password, and Role are required" },
        { status: 400 }
      );
    }

    // Create user (password will be hashed by pre-save hook)
    const newUser = await User.create({ name, email, password, role });

    return NextResponse.json(
      { success: true, message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating User", error);

    // Handle duplicate email
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create User" },
      { status: 500 }
    );
  }
}
