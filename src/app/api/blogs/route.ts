import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Blog } from "@/models/Blog";

// ======================
// GET /api/blogs
// - Get all blogs (with ordering, pagination, search, and filtering)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "10");
    const limit = Math.min(per_page, 100); // Max 100 items per page
    const skip = (page - 1) * limit;

    // Search and filter parameters
    const search = searchParams.get("search") || "";
    const author = searchParams.get("author") || "";
    const tags = searchParams.get("tags") || "";
    const published = searchParams.get("published") || "";

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across title, content, author, tags)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { metaTitle: { $regex: search, $options: "i" } },
        { metaDescription: { $regex: search, $options: "i" } }
      ];
    }

    // Add filters
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }
    if (tags) {
      query.tags = { $regex: tags, $options: "i" };
    }
    if (published !== "") {
      query.published = published === "true" ? true : published === "false" ? false : published;
    }

    // Get total count for pagination
    const total_count = await Blog.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Blog.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { 
        success: true, 
        message: "Blogs Retrieved", 
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count
        },
        filters: {
          search,
          author,
          tags,
          published
        }
      },
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

    // Create new blog instance and save to trigger pre-save hooks
    const newBlog = new Blog({ title, content, author, tags, published, metaTitle, metaDescription });
    await newBlog.save();
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