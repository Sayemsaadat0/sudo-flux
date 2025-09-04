import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Faq } from "@/models/Faq";

// ======================
// GET /api/faq/{id}
// - Get single FAQ by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Faq.findById(id);
    if (result) {
      return NextResponse.json(
        { success: true, message: "Single FAQ Retrieved", result },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "FAQ not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error Getting FAQ", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get FAQ" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/faq/{id}
// - Full update of FAQ
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Faq.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "FAQ updated successfully", faq: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating FAQ", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/faq/{id}
// - Partial update
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Faq.findByIdAndUpdate(id, { $set: body }, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "FAQ patched successfully", faq: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error patching FAQ", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to patch FAQ" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/faq/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Faq.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "FAQ deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting FAQ", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
