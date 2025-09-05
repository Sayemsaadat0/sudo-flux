import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Blog } from "@/models/Blog";
import { writeFile } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

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

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
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
        { metaDescription: { $regex: search, $options: "i" } },
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
      query.published =
        published === "true" ? true : published === "false" ? false : published;
    }

    // Get total count for pagination
    const total_count = await Blog.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Blog.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Return results as-is (with relative URLs)
    const resultsWithUrls = results.map(blog => blog.toObject());

    return NextResponse.json(
      {
        success: true,
        message: "Blogs Retrieved",
        results: resultsWithUrls,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          author,
          tags,
          published,
        },
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
    const formData = await request.formData();

    // Extract form fields
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const tagsString = formData.get("tags") as string;
    const published = formData.get("published") === "true";
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const slug = formData.get("slug") as string;
    const bannerImageFile = formData.get("banner_image") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and Content are required" },
        { status: 400 }
      );
    }

    let bannerImageUrl = "";

    // Handle banner image upload if provided
    if (bannerImageFile && bannerImageFile.size > 0) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(bannerImageFile.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file type. Only images are allowed.",
          },
          { status: 400 }
        );
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (bannerImageFile.size > maxSize) {
        return NextResponse.json(
          { success: false, message: "File too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = bannerImageFile.name.split(".").pop();
      const fileName = `${timestamp}_${randomString}.${fileExtension}`;

      // Ensure uploads directory exists
      const uploadsDir = join(process.cwd(), "public", "uploads", "blogs");
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }

      // Save file
      const bytes = await bannerImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(uploadsDir, fileName);
      await writeFile(path, buffer);

      // Set the relative image URL
      bannerImageUrl = `/uploads/blogs/${fileName}`;
    }

    // Parse tags
    const tags = tagsString ? JSON.parse(tagsString) : [];

    // Create new blog instance and save to trigger pre-save hooks
    const blogData = {
      title,
      content,
      author,
      tags,
      published,
      metaTitle,
      metaDescription,
      slug,
      banner_image: bannerImageUrl,
    };

    const newBlog = new Blog(blogData);
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


