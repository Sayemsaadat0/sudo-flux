import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Blog } from "@/models/Blog";
import { writeFile } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

// ======================
// GET /api/blogs/{id}
// - Get single blog by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Blog.findById(id);
                if (result) {
              return NextResponse.json(
                { success: true, message: "Single Blog Retrieved", result: result },
                { status: 200 }
              );
            }
    return NextResponse.json(
      { success: false, message: "Blog not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error Getting Blog", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Blog" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/blogs/{id}
// - Full update of blog (replace all fields)
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Blog.findByIdAndUpdate(id, body, {
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
// PATCH /api/blogs/{id}
// - Partial update
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Build update object
    const updateData: any = {
      title,
      content,
      author,
      published,
      metaTitle,
      metaDescription,
      slug,
    };

    // Parse tags if provided
    if (tagsString) {
      updateData.tags = JSON.parse(tagsString);
    }

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
      updateData.banner_image = `/uploads/blogs/${fileName}`;
    }
    
    const updated = await Blog.findByIdAndUpdate(id, { $set: updateData }, {
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
// DELETE /api/blogs/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Blog.findByIdAndDelete(id);
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
