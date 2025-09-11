import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Team } from "@/models/Team";

// ======================
// GET /api/teams/{id}
// - Get single team member by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Team member ID is required" },
        { status: 400 }
      );
    }

    const teamMember = await Team.findById(id);

    if (!teamMember) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Team Member Retrieved",
        team: teamMember.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Team Member", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Team Member" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/teams/{id}
// - Update team member by ID
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Team member ID is required" },
        { status: 400 }
      );
    }

    const { name, title, image, bio, socials, order, isActive } = body;

    // Check if team member exists
    const existingTeam = await Team.findById(id);
    if (!existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (image !== undefined) updateData.image = image;
    if (bio !== undefined) updateData.bio = bio;
    if (socials !== undefined) updateData.socials = socials;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Update team member
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Team member updated successfully",
        team: updatedTeam,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Team Member", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Team Member" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/teams/{id}
// - Delete team member by ID
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Team member ID is required" },
        { status: 400 }
      );
    }

    // Check if team member exists
    const existingTeam = await Team.findById(id);
    if (!existingTeam) {
      return NextResponse.json(
        { success: false, message: "Team member not found" },
        { status: 404 }
      );
    }

    // Delete team member
    await Team.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Team member deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Team Member", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Team Member" },
      { status: 500 }
    );
  }
}
