import { NextResponse } from "next/server";
import "@/DB/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

// Configure for static export
export const dynamic = "force-static";

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and Password are required" },
        { status: 400 }
      );
    }

    // Explicitly select password since it's select: false
    const user = await User.findOne({ email }).select("+password") as {
      _id: string | { toString(): string },
      role: string,
      email: string,
      comparePassword?: (password: string) => Promise<boolean>
    } | null;
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword?.(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET || process.env.JWT_SICRECT_KEY; // align with existing usage
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "JWT secret not configured" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role, email: user.email },
      secret,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { success: true, message: "Logged in successfully", token, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ success: false, message: "Failed to login" }, { status: 500 });
  }
}