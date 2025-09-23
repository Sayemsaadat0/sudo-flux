import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Team } from "@/models/Team";
import { put } from '@vercel/blob';

// ======================
// GET /api/teams/[id]
// - Get single team member
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const team = await Team.findById(id);
    
    if (!team) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Team member retrieved", team },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting team member", error);
    return NextResponse.json(
      { success: false, message: "Failed to get team member" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/teams/[id]
// - Update team member
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
    const title = formData.get("title") as string;
    const linkedin = formData.get("linkedin") as string;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !title) {
      return NextResponse.json(
        { success: false, message: "Name and Title are required" },
        { status: 400 }
      );
    }

    // Find existing team member
    const existingTeam = await Team.findById(id);
    if (!existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    let imageUrl = existingTeam.image || "";

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
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
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { success: false, message: "File too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = imageFile.name.split(".").pop();
      const fileName = `teams/${timestamp}_${randomString}.${fileExtension}`;

      // Upload to Vercel Blob Storage
      const blob = await put(fileName, imageFile, {
        access: 'public',
      });

      // Set the blob URL
      imageUrl = blob.url;
    }

    const updateData = {
      name,
      title,
      linkedin: linkedin || "",
      status: status || "current",
      image: imageUrl,
    };

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: "Team member updated successfully", team: updatedTeam },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating team member", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/teams/[id]
// - Delete team member
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    
    if (!deletedTeam) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team member", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete team member" },
      { status: 500 }
    );
  }
}