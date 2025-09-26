import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Consultation } from "@/models/Consultation";
import { transporter } from "@/lib/mailer";

// Configure for static export

// ======================
// GET /api/consultations
// - Get all consultations (with ordering, pagination, search, and filtering)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "10");
    const limit = Math.min(per_page, 100); // Max 100 items per page
    const skip = (page - 1) * limit;

    // Search and filter parameters
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const projectType = searchParams.get("projectType") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name, email, company, projectType, description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { projectType: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (status !== "") {
      query.status = status;
    }
    if (projectType !== "") {
      query.projectType = { $regex: projectType, $options: "i" };
    }

    // Get total count for pagination
    const total_count = await Consultation.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Consultation.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        message: "Consultations Retrieved",
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          status,
          projectType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Consultations", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Consultations" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/consultations
// - Create consultation
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract form fields
    const { name, email, phone, company, projectType, description } = body;

    if (!name || !email || !phone || !projectType || !description) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const newConsultation = await Consultation.create({
      name,
      email,
      phone,
      company,
      projectType,
      description,
    });

    // Send return email to the user
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e0e0e0; padding-bottom: 20px;">
              <h1 style="color: #333333; margin: 0; font-size: 24px; font-weight: bold;">
                Thank You for Your Consultation Request!
              </h1>
            </div>

            <!-- Main Content -->
            <div style="margin-bottom: 30px;">
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear ${name},
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for requesting a free consultation with Sudo Flux! We have received your consultation request for your <strong>${projectType}</strong> project and truly appreciate you taking the time to reach out to us.
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We will get back to you soon.
              </p>
            </div>

            <!-- Project Summary -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">Your Project Summary:</h3>
              <ul style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li><strong>Project Type:</strong> ${projectType}</li>
                ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
              </ul>
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

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Thank you for your consultation request - ${projectType} Project`,
        html: emailHtml,
      });

      console.log(`Consultation return email sent successfully to ${email}`);
    } catch (emailError) {
      console.error("Error sending consultation return email:", emailError);
      // Don't fail the consultation creation if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultation request created successfully",
        consultation: newConsultation,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Consultation", error);
    return NextResponse.json(
      { success: false, message: "Failed to create Consultation" },
      { status: 500 }
    );
  }
}
