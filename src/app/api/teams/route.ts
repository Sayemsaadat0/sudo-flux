import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Team } from "@/models/Team";

// Configure for static export
export const dynamic = "force-static";

// ======================
// GET /api/teams
// - Get all team members (with ordering, pagination, search, and filtering)
// ======================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ordering = searchParams.get("ordering") || "order"; // Default: by order

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "10");
    const limit = Math.min(per_page, 100); // Max 100 items per page
    const skip = (page - 1) * limit;

    // Search and filter parameters
    const search = searchParams.get("search") || "";
    const isActive = searchParams.get("isActive") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name, title, bio)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (isActive !== "") {
      query.isActive = isActive === "true" ? true : isActive === "false" ? false : isActive;
    }

    // Get total count for pagination
    const total_count = await Team.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Team.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Return results as-is
    const resultsWithUrls = results.map(team => team.toObject());

    return NextResponse.json(
      {
        success: true,
        message: "Team Members Retrieved",
        results: resultsWithUrls,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        },
        filters: {
          search,
          isActive,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Getting Team Members", error);
    return NextResponse.json(
      { success: false, message: "Failed to Get Team Members" },
      { status: 500 }
    );
  }
}

// ======================
// POST /api/teams
// - Create team member
// ======================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, image, bio, socials, order, isActive } = body;

    if (!name || !title || !image) {
      return NextResponse.json(
        { success: false, message: "Name, title, and image are required" },
        { status: 400 }
      );
    }

    // Create new team member instance
    const teamData = {
      name,
      title,
      image,
      bio,
      socials: socials || [],
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const newTeam = new Team(teamData);
    await newTeam.save();

    return NextResponse.json(
      { success: true, message: "Team member created successfully", team: newTeam },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating Team Member", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Duplicate key error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create Team Member" },
      { status: 500 }
    );
  }
}
