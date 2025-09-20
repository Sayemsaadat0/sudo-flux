import { NextRequest, NextResponse } from 'next/server';
import '@/DB/db'; // ensure DB connection
import { Visitor } from '@/models/Visitor';

// Configure for static export
export const dynamic = "force-static";

// POST endpoint - Update section tracking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, page_name, section_name, previous_section, duration } = body;

    // Validate required fields
    if (!session_id || !page_name || !section_name || duration === undefined) {
      return NextResponse.json(
        { error: 'session_id, page_name, section_name, and duration are required' },
        { status: 400 }
      );
    }

    // Find the session
    const session = await Visitor.findOne({ session_id });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Find existing page analytics or create new one
    let pageAnalytics = session.analytics.find((analytics: any) => analytics.page_name === page_name);

    if (!pageAnalytics) {
      // Create new page analytics
      pageAnalytics = {
        page_name: page_name,
        previous_page: null,
        page_sections: []
      };
      session.analytics.push(pageAnalytics);
    }

    // Add new section to the page
    pageAnalytics.page_sections.push({
      name: section_name,
      previous_section: previous_section,
      duration: duration
    });

    // Save the updated session
    await session.save();

    return NextResponse.json({
      success: true,
      message: 'Section updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error in POST /api/visitors/update-section:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
