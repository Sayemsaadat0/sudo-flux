import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Legal } from "@/models/Legal";

// ======================
// GET /api/legal
// - Get all legal documents (with filtering by type)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "";
    const isActive = searchParams.get("isActive") || "";

    // Build query object
    const query: any = {};

    if (type) {
      query.type = type;
    }

    if (isActive !== "") {
      query.isActive = isActive === "true";
    }

    // Get results
    const results = await Legal.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Legal documents retrieved successfully",
        results: results,
        total: results.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting legal documents:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get legal documents" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/legal
// - Create new legal document
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, title, content, version, isActive } = body;

    if (!type || !title || !content) {
      return NextResponse.json(
        { success: false, message: "Type, title, and content are required" },
        { status: 400 }
      );
    }

    // If setting as active, deactivate other documents of the same type
    if (isActive) {
      await Legal.updateMany(
        { type, isActive: true },
        { isActive: false }
      );
    }

    const legalData = {
      type,
      title,
      content,
      version: version || "1.0.0",
      isActive: isActive || false,
      lastUpdated: new Date(),
    };

    const newLegal = new Legal(legalData);
    await newLegal.save();

    return NextResponse.json(
      { success: true, message: "Legal document created successfully", legal: newLegal },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating legal document:", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A document of this type is already active" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create legal document" },
      { status: 500 }
    );
  }
}
