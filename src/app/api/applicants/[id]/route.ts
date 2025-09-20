import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Applicant } from "@/models/Applicant";

// Configure for static export
export const dynamic = "force-static";
import { Career } from "@/models/Career";

// ======================
// GET /api/applicants/{id}
// - Get single applicant by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Applicant ID is required" },
        { status: 400 }
      );
    }

    const applicant = await Applicant.findById(id);

    if (!applicant) {
      return NextResponse.json(
        { success: false, message: "Applicant not found" },
        { status: 404 }
      );
    }

    // Get career details
    let careerDetails = null;
    try {
      const career = await Career.findById(applicant.careerId);
      careerDetails = career ? career.toObject() : null;
    } catch (error) {
      console.error(`Error fetching career for applicant ${id}:`, error);
    }

    const applicantWithCareer = {
      ...applicant.toObject(),
      career_details: careerDetails
    };

    return NextResponse.json(
      {
        success: true,
        message: "Applicant Retrieved",
        applicant: applicantWithCareer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Applicant", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Applicant" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/applicants/{id}
// - Update applicant by ID
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
        { success: false, message: "Applicant ID is required" },
        { status: 400 }
      );
    }

    const { status, name, email, phone, coverLetter } = body;

    // Check if applicant exists
    const existingApplicant = await Applicant.findById(id);
    if (!existingApplicant) {
      return NextResponse.json(
        { success: false, message: "Applicant not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (coverLetter !== undefined) updateData.coverLetter = coverLetter;

    // Update applicant
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Applicant updated successfully",
        applicant: updatedApplicant,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Applicant", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Applicant" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/applicants/{id}
// - Delete applicant by ID
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Applicant ID is required" },
        { status: 400 }
      );
    }

    // Check if applicant exists
    const existingApplicant = await Applicant.findById(id);
    if (!existingApplicant) {
      return NextResponse.json(
        { success: false, message: "Applicant not found" },
        { status: 404 }
      );
    }

    // Delete applicant
    await Applicant.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Applicant deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Applicant", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Applicant" },
      { status: 500 }
    );
  }
}
