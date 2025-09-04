import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Contact } from "@/models/Contact";

// ======================
// GET /api/contact/{id}
// - Get single contact by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Contact.findById(id);
    if (result) {
      return NextResponse.json(
        { success: true, message: "Single Contact Retrieved", result },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Contact not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error Getting Contact", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Contact" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/contact/{id}
// - Full update of contact
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Contact.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Contact updated successfully", contact: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Contact", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Contact" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/contact/{id}
// - Partial update
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Contact.findByIdAndUpdate(id, { $set: body }, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Contact patched successfully", contact: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error patching Contact", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to patch Contact" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/contact/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Contact", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Contact" },
      { status: 500 }
    );
  }
}
