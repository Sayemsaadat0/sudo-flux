import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Career } from "@/models/Career";

// ======================
// GET /api/careers
// - Get all careers (with ordering)
// - Get single career by _id
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    if (_id) {
      const result = await Career.findById(_id);
      if (result) {
        return NextResponse.json(
          { success: true, message: "Single Career Retrieved", result },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    const results = await Career.find().sort({ [sortField]: sortDirection });
    return NextResponse.json(
      { success: true, message: "All Careers Retrieved", results },
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