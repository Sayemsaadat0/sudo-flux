import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Legal } from "@/models/Legal";

// ======================
// GET /api/legal/[id]
// - Get specific legal document by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const legal = await Legal.findById(id);

    if (!legal) {
      return NextResponse.json(
        { success: false, message: "Legal document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Legal document retrieved successfully",
        legal: legal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting legal document:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get legal document" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/legal/[id]
// - Update specific legal document
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { type, title, content, version, isActive } = body;

    if (!type || !title || !content) {
      return NextResponse.json(
        { success: false, message: "Type, title, and content are required" },
        { status: 400 }
      );
    }

    // If setting as active, deactivate other documents of the same type
    if (isActive) {
      await Legal.updateMany(
        { type, isActive: true, _id: { $ne: id } },
        { isActive: false }
      );
    }

    const updateData = {
      type,
      title,
      content,
      version: version || "1.0.0",
      isActive: isActive || false,
      lastUpdated: new Date(),
    };

    const updatedLegal = await Legal.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLegal) {
      return NextResponse.json(
        { success: false, message: "Legal document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Legal document updated successfully",
        legal: updatedLegal,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating legal document:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A document of this type is already active" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update legal document" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/legal/[id]
// - Delete specific legal document
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deletedLegal = await Legal.findByIdAndDelete(id);

    if (!deletedLegal) {
      return NextResponse.json(
        { success: false, message: "Legal document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Legal document deleted successfully",
        legal: deletedLegal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting legal document:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete legal document" },
      { status: 500 }
    );
  }
}
