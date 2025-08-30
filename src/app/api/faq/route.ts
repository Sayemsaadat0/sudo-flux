import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Faq } from "@/models/Faq";

// ======================
// GET /api/faq
// - Get all faqs (with ordering)
// - Get single faq by _id
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    if (_id) {
      const result = await Faq.findById(_id);
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
    }

    const results = await Faq.find().sort({ [sortField]: sortDirection });
    return NextResponse.json(
      { success: true, message: "All FAQs Retrieved", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting FAQs", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get FAQs" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/faq
// - Create FAQ
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, category } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: "Question and Answer are required" },
        { status: 400 }
      );
    }

    const newFaq = await Faq.create({ question, answer, category });
    return NextResponse.json(
      { success: true, message: "FAQ created successfully", faq: newFaq },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating FAQ", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/faq?_id=...
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
    const updated = await Faq.findByIdAndUpdate(_id, body, {
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
// PATCH /api/faq?_id=...
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
    const updated = await Faq.findByIdAndUpdate(_id, { $set: body }, {
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
// DELETE /api/faq?_id=...
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

    const deleted = await Faq.findByIdAndDelete(_id);
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