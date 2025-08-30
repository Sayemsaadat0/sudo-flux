import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Contact } from "@/models/Contact";

// ======================
// GET /api/contact
// - Get all contacts (with ordering)
// - Get single contact by _id
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    if (_id) {
      const result = await Contact.findById(_id);
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
    }

    const results = await Contact.find().sort({ [sortField]: sortDirection });
    return NextResponse.json(
      { success: true, message: "All Contacts Retrieved", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Contacts", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Contacts" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/contact
// - Create Contact
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, status } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, Email and Message are required" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({ name, email, phone, subject, message, status });
    return NextResponse.json(
      { success: true, message: "Contact created successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Contact", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Contact" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/contact?_id=...
// ======================
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for update" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await Contact.findByIdAndUpdate(_id, body, {
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
// PATCH /api/contact?_id=...
// ======================
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for update" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await Contact.findByIdAndUpdate(_id, { $set: body }, {
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
// DELETE /api/contact?_id=...
// ======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for deletion" },
        { status: 400 }
      );
    }

    const deleted = await Contact.findByIdAndDelete(_id);
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