import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Blog } from "@/models/Blog";

// ======================
// GET /api/blogs
// - Get all blogs (with ordering)
// - Get single blog by _id
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    if (_id) {
      const result = await Blog.findById(_id);
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
    }

    const results = await Blog.find().sort({ [sortField]: sortDirection });
    return NextResponse.json(
      { success: true, message: "All Blogs Retrieved", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Blogs", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Blogs" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/blogs
// - Create blog
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author, tags, published, metaTitle, metaDescription } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and Content are required" },
        { status: 400 }
      );
    }

    // slug is auto-generated from title in the model hooks
    const newBlog = await Blog.create({ title, content, author, tags, published, metaTitle, metaDescription });
    return NextResponse.json(
      { success: true, message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Blog", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Blog" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/blogs?_id=...
// - Full replace-like update (but implemented as set all provided fields)
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
    const updated = await Blog.findByIdAndUpdate(_id, body, {
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
// PATCH /api/blogs?_id=...
// - Partial update
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
    const updated = await Blog.findByIdAndUpdate(_id, { $set: body }, {
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
// DELETE /api/blogs?_id=...
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

    const deleted = await Blog.findByIdAndDelete(_id);
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