import { NextResponse } from "next/server";
import "@/DB/db";
import { User } from "@/models/User";
import crypto from "crypto";

// Configure for static export
 

// POST /api/auth/forgot-password
// body: { email }
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("_id email");
    if (!user) {
      // Don't reveal user existence
      return NextResponse.json(
        { success: true, message: "If the email exists, a reset link will be sent" },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires as any;
    await user.save({ validateBeforeSave: false });

    // In real app: email the link below to user
    // Example reset URL (frontend page or API endpoint):
    // `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    return NextResponse.json(
      {
        success: true,
        message: "If the email exists, a reset link will be sent",
        // For development/testing only, return the raw token. Remove in prod.
        devResetToken: resetToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}