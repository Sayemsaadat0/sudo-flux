import { NextResponse } from "next/server";
import "@/DB/db";
import { User } from "@/models/User";

// Configure for static export
export const dynamic = "force-static";

// POST /api/auth/register
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Name, Email, Password, and Role are required" },
        { status: 400 }
      );
    }

    // Create user (pre-save hook hashes password)
    const user = await User.create({ name, email, password, role });

    return NextResponse.json(
      { success: true, message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, message: "Failed to register" }, { status: 500 });
  }
}