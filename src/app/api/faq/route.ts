import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Faq } from "@/models/Faq";

// Configure for static export
 

// ======================
// GET /api/faq
// - Get all FAQs (with ordering, pagination, search, and filtering)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ordering = searchParams.get("ordering") || "-createdAt"; // Default: latest first
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    // const per_page = parseInt(searchParams.get("per_page") || "10"); // Unused variable
    const limit = parseInt(searchParams.get("limit") || "10");
    const finalLimit = Math.min(limit, 100); // Max 100 items per page
    const skip = (page - 1) * finalLimit;

    // Search and filter parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const publish = searchParams.get("publish") || "";

    const sortField = ordering.startsWith("-") ? ordering.substring(1) : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across question, answer, and category)
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    // Add filters
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Add publish filter
    if (publish !== "") {
      query.publish = publish === "true";
    }

    // Get total count for pagination
    const total_count = await Faq.countDocuments(query);
    const total_pages = Math.ceil(total_count / finalLimit);

    // Get paginated results with search and filters
    const results = await Faq.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(finalLimit);

    return NextResponse.json(
      { 
        success: true, 
        message: "FAQs Retrieved", 
        data: {
          result: results,
          total: total_count
        },
        pagination: {
          current_page: page,
          total_pages,
          per_page: finalLimit,
          total_count
        },
        filters: {
          search,
          category,
          publish
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting FAQs", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get FAQs" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/faq
// - Create FAQ with FormData
// ======================
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const category = formData.get("category") as string;
    const publish = formData.get("publish") as string;

    if (!question || !answer || !category) {
      return NextResponse.json(
        { success: false, message: "Question, Answer and Category are required" },
        { status: 400 }
      );
    }

    const newFaq = await Faq.create({ 
      question, 
      answer, 
      category, 
      publish: publish === "true"
    });
    
    return NextResponse.json(
      { success: true, message: "FAQ created successfully", faq: newFaq },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating FAQ", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

// ======================
// PUT /api/faq?_id=...
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
    const updated = await Faq.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "FAQ updated successfully", faq: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating FAQ", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}


// ======================
// DELETE /api/faq?_id=...
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

    const deleted = await Faq.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "FAQ deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting FAQ", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}