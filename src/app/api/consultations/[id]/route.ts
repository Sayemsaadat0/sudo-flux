import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Consultation } from "@/models/Consultation";
import mongoose from "mongoose";

// Configure for static export
 

// ======================
// GET /api/consultations/[id]
// - Get single consultation by ID
// ======================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid consultation ID" },
        { status: 400 }
      );
    }

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return NextResponse.json(
        { success: false, message: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Consultation Retrieved", consultation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Consultation", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Consultation" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH /api/consultations/[id]
// - Update consultation
// ======================
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, company, projectType, budget, timeline, description, status } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid consultation ID" },
        { status: 400 }
      );
    }

    if (!name || !email || !phone || !projectType || !budget || !timeline || !description) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const updateData: any = {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      description,
    };

    if (status !== undefined) {
      updateData.status = status;
    }

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedConsultation) {
      return NextResponse.json(
        { success: false, message: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Consultation updated successfully", consultation: updatedConsultation },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Consultation", error);
    return NextResponse.json(
      { success: false, message: "Failed to update Consultation" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE /api/consultations/[id]
// - Delete consultation
// ======================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid consultation ID" },
        { status: 400 }
      );
    }

    const deletedConsultation = await Consultation.findByIdAndDelete(id);

    if (!deletedConsultation) {
      return NextResponse.json(
        { success: false, message: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Consultation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Consultation", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Consultation" },
      { status: 500 }
    );
  }
}
