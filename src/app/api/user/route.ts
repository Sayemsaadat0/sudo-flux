import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { User } from "@/models/User";

// ======================
// GET API
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    // Handle sorting
    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Fetch single user by ID
    if (_id) {
      const result = await User.findById(_id);
      if (result) {
        return NextResponse.json(
          { success: true, message: "Single User Retrieved", result },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
    }

    // Otherwise fetch all users
    const results = await User.find().sort({ [sortField]: sortDirection });
    return NextResponse.json(
      { success: true, message: "All Users Retrieved", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Users", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Users" },
      { status: 500 }
    );
  }
}

// ======================
// POST API
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Name, Email, Password, and Role are required" },
        { status: 400 }
      );
    }

    // Create user (password will be hashed by pre-save hook)
    const newUser = await User.create({ name, email, password, role });

    return NextResponse.json(
      { success: true, message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating User", error);

    // Handle duplicate email
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create User" },
      { status: 500 }
    );
  }
}
