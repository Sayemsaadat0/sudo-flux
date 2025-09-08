import { NextRequest, NextResponse } from 'next/server';
import '@/DB/db'; // ensure DB connection
import { Visitor } from '@/models/Visitor';

// Utility function to generate 9-digit unique session ID
function generateSessionId(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// POST endpoint - Create a new visitor session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_name, section_name } = body;

    // Validate required fields
    if (!page_name || !section_name) {
      return NextResponse.json(
        { error: 'page_name and section_name are required' },
        { status: 400 }
      );
    }

    // Generate new session ID
    const sessionId = generateSessionId();

    // Create initial session with first page and section
    const session = await Visitor.create({
      session_id: sessionId,
      session_details: {
        ip_address: 'pending',
        location: 'pending',
        browser_type: 'pending',
        device_type: 'Desktop' // Default, will be updated later
      },
      analytics: [{
        page_name: page_name,
        previous_page: null,
        page_sections: [{
          name: section_name,
          previous_section: null,
          duration: 0 // Will be updated when user leaves section
        }]
      }]
    });

    return NextResponse.json({
      success: true,
      data: {
        session_id: session.session_id,
        created_at: session.created_at
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/visitors/create-session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
