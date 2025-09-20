import { NextRequest, NextResponse } from 'next/server';
import '@/DB/db'; // ensure DB connection
import { Visitor, Session } from '@/models/Visitor';

// Configure for static export
export const dynamic = "force-static";

// Utility function to generate 9-digit unique session ID
function generateSessionId(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// POST endpoint - Create or update visitor session
export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { session_id, session_details, analytics } = body;

    // Validate required fields
    if (!analytics) {
      return NextResponse.json(
        { error: 'analytics is required' },
        { status: 400 }
      );
    }

    // session_details is only required for new sessions
    if (!session_id && !session_details) {
      return NextResponse.json(
        { error: 'session_details is required for new sessions' },
        { status: 400 }
      );
    }

    // Validate session_details structure only if provided
    if (session_details) {
      const { ip_address, location, browser_type, device_type } = session_details;
      if (!ip_address || !location || !browser_type || !device_type) {
        return NextResponse.json(
          { error: 'All session_details fields are required' },
          { status: 400 }
        );
      }

      // Validate device_type enum
      if (!['Desktop', 'Mobile', 'Tablet'].includes(device_type)) {
        return NextResponse.json(
          { error: 'device_type must be Desktop, Mobile, or Tablet' },
          { status: 400 }
        );
      }
    }

    // Validate analytics structure
    if (!Array.isArray(analytics)) {
      return NextResponse.json(
        { error: 'analytics must be an array' },
        { status: 400 }
      );
    }

    // Validate each analytics entry
    for (const analytic of analytics) {
      if (!analytic.page_name || !Array.isArray(analytic.page_sections)) {
        return NextResponse.json(
          { error: 'Each analytics entry must have page_name and page_sections array' },
          { status: 400 }
        );
      }

      // Validate page_sections
      for (const section of analytic.page_sections) {
        if (!section.name || typeof section.duration !== 'number' || section.duration < 0) {
          return NextResponse.json(
            { error: 'Each page_section must have name and non-negative duration' },
            { status: 400 }
          );
        }
      }
    }

    let session: Session | null;

    if (session_id) {
      // Update existing session - append new analytics instead of replacing
      const updateData: any = {
        $push: { analytics: { $each: analytics } }
      };
      
      // Only update session_details if provided
      if (session_details) {
        updateData.session_details = session_details;
      }
      
      session = await Visitor.findOneAndUpdate(
        { session_id },
        updateData,
        { new: true, upsert: false }
      );

      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }
    } else {
      // Create new session
      const newSessionId = generateSessionId();
      
      session = await Visitor.create({
        session_id: newSessionId,
        session_details,
        analytics
      });
    }

    return NextResponse.json({
      success: true,
      data: session!
    }, { status: 200 });

  } catch (error) {
    console.error('Error in POST /api/visitors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint - Retrieve visitor sessions
export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get('session_id');
    const page = parseInt(searchParams.get('page') || '1');
    const per_page = parseInt(searchParams.get('per_page') || '10');
    const limit = Math.min(per_page, 100); // Max 100 items per page
    const skip = (page - 1) * limit;

    let query = {};

    // If session_id is provided, get specific session
    if (session_id) {
      const session = await Visitor.findOne({ session_id });
      
      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: session
      }, { status: 200 });
    }

    // Get paginated list of sessions
    const sessions = await Visitor.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const total_count = await Visitor.countDocuments(query);
    const total_pages = Math.ceil(total_count / limit);

    return NextResponse.json({
      success: true,
      message: "Visitors Retrieved",
      results: sessions,
      pagination: {
        current_page: page,
        total_pages,
        per_page: limit,
        total_count,
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error in GET /api/visitors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
