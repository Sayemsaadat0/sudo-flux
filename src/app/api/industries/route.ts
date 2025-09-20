import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Industry } from "@/models/Industry";

// Configure for static export
 

// ======================
// GET /api/industries
// - Get all industries (with ordering, pagination, search, and filtering)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ordering = searchParams.get("ordering") || "-createdAt";
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "10");
    const limit = Math.min(per_page, 100); // Max 100 items per page
    const skip = (page - 1) * limit;

    // Search parameter
    const search = searchParams.get("search") || "";

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search
    const query: any = {};

    // Add search functionality (searches across name and description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Get total count for pagination
    const total_count = await Industry.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search
    const results = await Industry.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { 
        success: true, 
        message: "Industries Retrieved", 
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count
        },
        filters: {
          search
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Industries", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Industries" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/industries
// - Create industry
// ======================
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const iconFile = formData.get("icon") as File | null;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    let iconUrl = "";

    // Handle icon upload if provided
    if (iconFile && iconFile.size > 0) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(iconFile.type)) {
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
      if (iconFile.size > maxSize) {
        return NextResponse.json(
          { success: false, message: "File too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = iconFile.name.split(".").pop();
      const fileName = `industries/${timestamp}_${randomString}.${fileExtension}`;

      // Upload to Vercel Blob Storage
      const { put } = await import('@vercel/blob');
      const blob = await put(fileName, iconFile, {
        access: 'public',
      });

      // Set the blob URL
      iconUrl = blob.url;
    }

    // Create new industry instance
    const industryData = {
      name,
      description,
      icon: iconUrl,
    };

    const newIndustry = new Industry(industryData);
    await newIndustry.save();

    return NextResponse.json(
      { success: true, message: "Industry created successfully", industry: newIndustry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Industry", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Industry name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Industry" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/industries?_id=...
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
    const updated = await Industry.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Industry updated successfully", industry: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Industry", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Industry" },
      { status: 500 }
    );
  }
}


// ======================
// DELETE /api/industries?_id=...
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

    const deleted = await Industry.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Industry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Industry", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Industry" },
      { status: 500 }
    );
  }
}