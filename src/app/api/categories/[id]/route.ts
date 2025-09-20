import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Category } from "@/models/Category";
import mongoose from "mongoose";


// ======================
// GET /api/categories/[id]
// - Get single category by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category Retrieved", category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Category", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Category" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/categories/[id]
// - Update category
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, status } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    const updateData: any = { name };
    if (status !== undefined) {
      updateData.status = status;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category updated successfully", category: updatedCategory },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Category", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Category name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Category" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/categories/[id]
// - Delete category
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Category", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Category" },
      { status: 500 }
    );
  }
}
