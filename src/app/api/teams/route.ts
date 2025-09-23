import { NextResponse } from "next/server";
import "@/DB/db"; // ensure DB connection
import { Team } from "@/models/Team";
import { put } from '@vercel/blob';

// Configure for static export

// ======================
// GET /api/teams
// - Get all team members (with ordering, pagination, search, and filtering)
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
    const title = searchParams.get("title") || "";
    const status = searchParams.get("status") || "";

    const sortField = ordering.startsWith("-")
      ? ordering.substring(1)
      : ordering;
    const sortDirection = ordering.startsWith("-") ? -1 : 1;

    // Build query object for search and filtering
    const query: any = {};

    // Add search functionality (searches across name, title)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
      ];
    }

    // Add filters
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (status !== "") {
      query.status = status;
    }

    // Get total count for pagination
    const total_count = await Team.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    // Get paginated results with search and filters
    const results = await Team.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit);

    // Return results as-is (with relative URLs)
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
          title,
          status,
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
    const formData = await request.formData();

    // Extract form fields
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const linkedin = formData.get("linkedin") as string;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !title) {
      return NextResponse.json(
        { success: false, message: "Name and Title are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file type. Only images are allowed.",
          },
          { status: 400 }
        );
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { success: false, message: "File too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = imageFile.name.split(".").pop();
      const fileName = `teams/${timestamp}_${randomString}.${fileExtension}`;

      // Upload to Vercel Blob Storage
      const blob = await put(fileName, imageFile, {
        access: 'public',
      });

      // Set the blob URL
      imageUrl = blob.url;
    }

    const teamData = {
      name,
      title,
      linkedin: linkedin || "",
      status: status || "current",
      image: imageUrl,
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