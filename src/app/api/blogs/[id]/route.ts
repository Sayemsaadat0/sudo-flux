import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Blog } from "@/models/Blog";

// ======================
// GET /api/blogs/{id}
// - Get single blog by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Blog.findById(id);
    if (result) {
      return NextResponse.json(
        { success: true, message: "Single Blog Retrieved", result },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Blog not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error Getting Blog", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Blog" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/blogs/{id}
// - Full update of blog (replace all fields)
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog updated successfully", blog: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Blog", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Blog" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/blogs/{id}
// - Partial update
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Blog.findByIdAndUpdate(id, { $set: body }, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog patched successfully", blog: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error patching Blog", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to patch Blog" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/blogs/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Blog", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Blog" },
      { status: 500 }
    );
  }
}
