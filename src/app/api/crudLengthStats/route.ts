import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Blog } from "@/models/Blog";
import { Industry } from "@/models/Industry";
import { Contact } from "@/models/Contact";
import { Faq } from "@/models/Faq";

// ======================
// GET /api/crudLengthStats
// - Get count statistics for all CRUD entities
// ======================
export async function GET() {
  try {
    // Get counts for all entities in parallel
    const [blogsCount, industriesCount, contactsCount, faqsCount] = await Promise.all([
      Blog.countDocuments(),
      Industry.countDocuments(),
      Contact.countDocuments(),
      Faq.countDocuments()
    ]);

    const stats = {
      blogs: blogsCount,
      industries: industriesCount,
      contacts: contactsCount,
      faqs: faqsCount,
      total: blogsCount + industriesCount + contactsCount + faqsCount
    };

    return NextResponse.json(
      { 
        success: true, 
        message: "CRUD Length Stats Retrieved", 
        data: stats
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting CRUD Length Stats", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get CRUD Length Stats" },
      { status: 500 }
    );
  }
}

