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

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across title, description, department, location, responsibilities, requirements)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { responsibilities: { $regex: search, $options: "i" } },
        { requirements: { $regex: search, $options: "i" } }
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
      query.type = { $regex: type, $options: "i" };
    }
    if (status) {
      query.status = { $regex: status, $options: "i" };
    }

    // Get total count for pagination
    const total_count = await Career.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Career.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { 
        success: true, 
        message: "Careers Retrieved", 
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count
        },
        filters: {
          search,
          department,
          location,
          type,
          status
        }
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
// - Create Career
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, department, location, type, description, responsibilities, requirements, status } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and Description are required" },
        { status: 400 }
      );
    }

    const newCareer = await Career.create({
      title,
      department,
      location,
      type,
      description,
      responsibilities,
      requirements,
      status,
    });

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

// ======================
// PUT /api/careers?_id=...
// ======================
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for update" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await Career.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Career updated successfully", career: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Career", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Career" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/careers?_id=...
// ======================
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for update" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await Career.findByIdAndUpdate(_id, { $set: body }, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Career patched successfully", career: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error patching Career", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to patch Career" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/careers?_id=...
// ======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for deletion" },
        { status: 400 }
      );
    }

    const deleted = await Career.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Career deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Career", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Career" },
      { status: 500 }
    );
  }
}