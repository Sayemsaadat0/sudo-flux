import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, email } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e0e0e0; padding-bottom: 20px;">
            <h1 style="color: #333333; margin: 0; font-size: 24px; font-weight: bold;">
              Thank You for Contacting Us!
            </h1>
          </div>

          <!-- Main Content -->
          <div style="margin-bottom: 30px;">
            <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Dear ${firstName},
            </p>
            
            <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out to us! We have received your message and truly appreciate you taking the time to contact us.
            </p>
            
            <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 hours during business days.
            </p>
            
            <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              If you have any urgent questions or concerns, please don't hesitate to reach out to us directly.
            </p>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
            <p style="color: #888888; font-size: 14px; margin: 0 0 10px 0;">
              Best regards,<br />
              The Sudo Flux Team
            </p>
            
            <p style="color: #888888; font-size: 12px; margin: 0; font-style: italic;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM, // must be the same domain email
      to: email,
      subject: `Thank you for contacting Sudo Flux - Your Inquiry`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (err: any) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
