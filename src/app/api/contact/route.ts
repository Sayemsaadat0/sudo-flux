import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Contact } from "@/models/Contact";
import { transporter } from "@/lib/mailer";

// Configure for static export
 

// ======================
// GET /api/contact
// - Get all contacts (with ordering, pagination, search, and filtering)
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

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name, email, subject, description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Add filters
    if (status) {
      query.status = { $regex: status, $options: "i" };
    }

    // Get total count for pagination
    const total_count = await Contact.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Contact.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { 
        success: true, 
        message: "Contacts Retrieved", 
        results,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count
        },
        filters: {
          search,
          status
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Contacts", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Contacts" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/contact
// - Create Contact
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract form fields
    const { name, email, subject, description } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { success: false, message: "Name, Email and Description are required" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({ 
      name, 
      email, 
      subject, 
      description
    });

    // Send return email to the user
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e0e0e0; padding-bottom: 20px;">
              <h1 style="color: #333333; margin: 0; font-size: 24px; font-weight: bold;">
                Thank You for Reaching Out!
              </h1>
            </div>

            <!-- Main Content -->
            <div style="margin-bottom: 30px;">
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear ${name},
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for reaching out to us! We have received your message${subject ? ` regarding "${subject}"` : ''} and truly appreciate you taking the time to contact us.
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We will get back to you soon.
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

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Thank you for contacting Sudo Flux - ${subject || 'Your Inquiry'}`,
        html: emailHtml,
      });

      console.log(`Return email sent successfully to ${email}`);
    } catch (emailError) {
      console.error("Error sending return email:", emailError);
      // Don't fail the contact creation if email fails
    }
    
    return NextResponse.json(
      { success: true, message: "Contact created successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Contact", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Contact" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/contact?_id=...
// ======================
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for update" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updated = await Contact.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Contact updated successfully", contact: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating Contact", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update Contact" },
      { status: 500 }
    );
  }
}


// ======================
// DELETE /api/contact?_id=...
// ======================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
      return NextResponse.json(
        { success: false, message: "_id is required for deletion" },
        { status: 400 }
      );
    }

    const deleted = await Contact.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Contact", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete Contact" },
      { status: 500 }
    );
  }
}