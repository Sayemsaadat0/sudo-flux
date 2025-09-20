import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Service } from "@/models/Service";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

// Configure for static export
export const dynamic = "force-static";

// ======================
// GET /api/services/[id]
// - Get single service by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid service ID" },
        { status: 400 }
      );
    }

    const service = await Service.findById(id).populate('category', 'name status');

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Service Retrieved", service },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Service", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Service" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/services/[id]
// - Update service
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, subTitle, statsString, description, benefits, category } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid service ID" },
        { status: 400 }
      );
    }

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

    const updateData = {
      title,
      subTitle,
      statsString,
      description,
      benefits,
      category,
    };

    const updatedService = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name status');

    if (!updatedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Service updated successfully", service: updatedService },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Service", error);
    return NextResponse.json(
      { success: false, message: "Failed to update Service" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/services/[id]
// - Delete service
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid service ID" },
        { status: 400 }
      );
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Service", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Service" },
      { status: 500 }
    );
  }
}
