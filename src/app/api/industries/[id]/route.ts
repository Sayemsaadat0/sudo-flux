import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Industry } from "@/models/Industry";

// ======================
// GET /api/industries/{id}
// - Get single industry by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await Industry.findById(id);
    if (result) {
      return NextResponse.json(
        { success: true, message: "Single Industry Retrieved", result },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Industry not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error Getting Industry", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Industry" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/industries/{id}
// - Full update of industry
// ======================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updated = await Industry.findByIdAndUpdate(id, body, {
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
// PATCH /api/industries/{id}
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
    const description = formData.get("description") as string;
    const iconFile = formData.get("icon") as File | null;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    // Get existing industry
    const existingIndustry = await Industry.findById(id);
    if (!existingIndustry) {
      return NextResponse.json(
        { success: false, message: "Industry not found" },
        { status: 404 }
      );
    }

    let iconUrl = existingIndustry.icon;

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

    // Update industry
    const updated = await Industry.findByIdAndUpdate(id, { 
      $set: { 
        name, 
        description, 
        icon: iconUrl 
      } 
    }, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, message: "Industry updated successfully", industry: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Industry", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Industry name already exists" },
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
// DELETE /api/industries/{id}
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const deleted = await Industry.findByIdAndDelete(id);
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
