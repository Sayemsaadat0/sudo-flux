import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Industry } from "@/models/Industry";

// ======================
// GET /api/industries
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const ordering = searchParams.get("ordering") || "-createdAt";

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    if (_id) {
      const result = await Industry.findById(_id);
      if (result) {
        return NextResponse.json(
          { success: true, message: "Single Industry Retrieved", result },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    const results = await Industry.find().sort({ [sortField]: sortDirection });
    return NextResponse.json(
      { success: true, message: "All Industries Retrieved", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Industries", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Industries" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/industries
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, icon } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const newIndustry = await Industry.create({ name, description, icon });
    return NextResponse.json(
      { success: true, message: "Industry created successfully", industry: newIndustry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Industry", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Industry name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Industry" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/industries?_id=...
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
    const updated = await Industry.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Industry updated successfully", industry: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Industry", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Industry" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/industries?_id=...
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
    const updated = await Industry.findByIdAndUpdate(_id, { $set: body }, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Industry patched successfully", industry: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error patching Industry", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to patch Industry" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/industries?_id=...
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

    const deleted = await Industry.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Industry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Industry", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Industry" },
      { status: 500 }
    );
  }
}