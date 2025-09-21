import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Career } from "@/models/Career";


// ======================
// GET /api/careers/[id]
// - Get single career by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Career ID is required" },
        { status: 400 }
      );
    }

    const career = await Career.findById(id);

    if (!career) {
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Career Retrieved",
        career: career.toObject(),
      },
      { status: 200 }
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
// PATCH /api/careers/[id]
// - Update career by ID
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Career ID is required" },
        { status: 400 }
      );
    }

    const {
      title,
      department,
      location,
      type,
      description,
      responsibilities,
      requirements,
      status
    } = body;

    // Check if career exists
    const existingCareer = await Career.findById(id);
    if (!existingCareer) {
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (department !== undefined) updateData.department = department;
    if (location !== undefined) updateData.location = location;
    if (type !== undefined) updateData.type = type;
    if (description !== undefined) updateData.description = description;
    if (responsibilities !== undefined) updateData.responsibilities = responsibilities;
    if (requirements !== undefined) updateData.requirements = requirements;
    if (status !== undefined) updateData.status = status;

    // Update career
    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Career updated successfully",
        career: updatedCareer,
      },
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
// DELETE /api/careers/[id]
// - Delete career by ID
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Career ID is required" },
        { status: 400 }
      );
    }

    // Check if career exists
    const existingCareer = await Career.findById(id);
    if (!existingCareer) {
      return NextResponse.json(
        { success: false, message: "Career not found" },
        { status: 404 }
      );
    }

    // Delete career
    await Career.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Career deleted successfully",
      },
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