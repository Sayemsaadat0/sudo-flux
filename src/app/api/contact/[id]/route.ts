import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Contact } from "@/models/Contact";

// Configure for static export
export const dynamic = "force-static";

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
// - Partial update with FormData
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const status = formData.get("status") as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, Email and Message are required" },
        { status: 400 }
      );
    }

    const updated = await Contact.findByIdAndUpdate(id, { 
      $set: { 
        name, 
        email, 
        phone, 
        subject, 
        message, 
        status: status || "new" 
      } 
    }, {
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
