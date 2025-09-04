import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Industry } from "@/models/Industry";

// ======================
// GET /api/industries/{id}
// - Get single industry by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Industry.findById(id);
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
  } catch (error) {
    console.error("Error Getting Industry", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Industry" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/industries/{id}
// - Full update of industry
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Industry.findByIdAndUpdate(id, body, {
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
// PATCH /api/industries/{id}
// - Partial update
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Industry.findByIdAndUpdate(id, { $set: body }, {
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
// DELETE /api/industries/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Industry.findByIdAndDelete(id);
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
