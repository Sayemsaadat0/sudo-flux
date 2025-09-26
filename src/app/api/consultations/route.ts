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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
        <!-- Main Container -->
        <div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
          
          <!-- Header Section -->
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 30px; text-align: center; position: relative;">
         
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                Request Received!
              </h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 10px 0 0 0; font-weight: 300;">
                Thank you for choosing Sudo Flux
              </p>
            </div>
          </div>
    
          <!-- Content Section -->
          <div style="padding: 40px 30px;">
            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d3748; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">
                Hello ${name}! 👋
              </h2>
              <p style="color: #4a5568; font-size: 16px; line-height: 1.7; margin: 0;">
                We've successfully received your consultation request for your <strong style="color: #2d3748;">${projectType}</strong> project. Your interest in working with us means the world to our team!
              </p>
            </div>
    
            <!-- Action Steps -->
            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #4facfe;">
              <h3 style="color: #2d3748; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; display: flex; align-items: center;">
                <span style="background: #4facfe; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 10px;">1</span>
                What happens next?
              </h3>
              <div style="space-y: 15px;">
                <div style="display: flex; align-items: start; margin-bottom: 15px;">
                  <div style="background: #e6fffa; color: #319795; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                    <span style="font-size: 14px;">⏰</span>
                  </div>
                  <div>
                    <p style="color: #2d3748; font-size: 15px; font-weight: 500; margin: 0 0 5px 0;">We'll review your project</p>
                    <p style="color: #718096; font-size: 14px; margin: 0;">Our team will analyze your requirements within the next few hours</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; margin-bottom: 15px;">
                  <div style="background: #fef5e7; color: #d69e2e; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                    <span style="font-size: 14px;">📞</span>
                  </div>
                  <div>
                    <p style="color: #2d3748; font-size: 15px; font-weight: 500; margin: 0 0 5px 0;">Schedule your free consultation</p>
                    <p style="color: #718096; font-size: 14px; margin: 0;">Expect to hear from us within <strong>24 hours</strong> to book your call</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start;">
                  <div style="background: #fed7e2; color: #d53f8c; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
                    <span style="font-size: 14px;">🚀</span>
                  </div>
                  <div>
                    <p style="color: #2d3748; font-size: 15px; font-weight: 500; margin: 0 0 5px 0;">Bring your vision to life</p>
                    <p style="color: #718096; font-size: 14px; margin: 0;">We'll discuss how to transform your ideas into reality</p>
                  </div>
                </div>
              </div>
            </div>
    
            <!-- Project Summary Card -->
            <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 30px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 0 0 0 100px; opacity: 0.1;"></div>
              <div style="position: relative; z-index: 1;">
                <h3 style="color: #2d3748; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; display: flex; align-items: center;">
                  <span style="background: #4facfe; color: white; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 10px;">📋</span>
                  Project Summary
                </h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #718096; font-size: 14px; font-weight: 500;">Project Type:</span>
                    <span style="color: #2d3748; font-size: 14px; font-weight: 600; background: #edf2f7; padding: 4px 12px; border-radius: 20px;">${projectType}</span>
                  </div>
                  ${
                    company
                      ? `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                      <span style="color: #718096; font-size: 14px; font-weight: 500;">Company:</span>
                      <span style="color: #2d3748; font-size: 14px; font-weight: 600;">${company}</span>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
    
                
          </div>
    
          <!-- Footer -->
          <div style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="margin-bottom: 20px;">
              <p style="color: #2d3748; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                The Sudo Flux Team
              </p>
              <p style="color: #718096; font-size: 14px; margin: 0;">
                Building digital experiences that matter
              </p>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0 0 10px 0;">
                Need immediate assistance? Reach out to us directly.
              </p>
              <p style="color: #a0aec0; font-size: 11px; margin: 0; font-style: italic;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
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
