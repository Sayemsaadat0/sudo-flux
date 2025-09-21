import { NextResponse } from "next/server";
import "@/DB/db";
import { User } from "@/models/User";
import crypto from "crypto";

// Configure for static export
 

// POST /api/auth/reset-password
// body: { token, password }
export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Token and new password are required" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Token is invalid or has expired" },
        { status: 400 }
      );
    }

    user.password = password; // will be hashed by pre-save hook
    user.resetPasswordToken = undefined as any;
    user.resetPasswordExpires = undefined as any;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error", error);
    return NextResponse.json(
      { success: false, message: "Failed to reset password" },
      { status: 500 }
    );
  }
}