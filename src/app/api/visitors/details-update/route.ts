import { NextRequest, NextResponse } from 'next/server';
import '@/DB/db'; // ensure DB connection
import { Visitor } from '@/models/Visitor';

// Configure for static export
export const dynamic = "force-static";

// POST endpoint - Update visitor session details
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, session_details, analytics } = body;

    // Validate required fields
    if (!session_id) {
      return NextResponse.json(
        { error: 'session_id is required' },
        { status: 400 }
      );
    }

    if (!session_details) {
      return NextResponse.json(
        { error: 'session_details is required' },
        { status: 400 }
      );
    }

    // Validate session_details structure
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

    // Find and update the session
    const session = await Visitor.findOneAndUpdate(
      { session_id },
      {
        session_details,
        ...(analytics && { $push: { analytics: { $each: analytics } } })
      },
      { new: true }
    );

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Session details updated successfully',
      data: session
    }, { status: 200 });

  } catch (error) {
    console.error('Error in POST /api/visitors/details-update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
