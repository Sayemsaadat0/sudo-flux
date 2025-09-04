import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Career } from "@/models/Career";

// ======================
// GET /api/careers/{id}
// - Get single career by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Career.findById(id);
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
  } catch (error) {
    console.error("Error Getting Career", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Career" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/careers/{id}
// - Full update of career
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Career.findByIdAndUpdate(id, body, {
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
// PATCH /api/careers/{id}
// - Partial update
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Career.findByIdAndUpdate(id, { $set: body }, {
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
// DELETE /api/careers/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Career.findByIdAndDelete(id);
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
