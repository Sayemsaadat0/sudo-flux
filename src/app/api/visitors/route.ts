import { NextRequest, NextResponse } from 'next/server';
import '@/DB/db'; // ensure DB connection
import { Visitor, Session } from '@/models/Visitor';

// Configure for static export
 

// Utility function to generate 9-digit unique session ID
function generateSessionId(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// POST endpoint - Create or update visitor session
export async function POST(request: NextRequest) {
  try {
    console.log('📡 POST /api/visitors called');

    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
      console.log('📋 Request body received');
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON format in request body',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
        },
        { status: 400 }
      );
    }

    const { session_id, session_details, analytics } = body;

    // Validate request structure
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Request body must be a valid JSON object'
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!analytics) {
      return NextResponse.json(
        { 
          success: false,
          error: 'analytics field is required',
          received_fields: Object.keys(body)
        },
        { status: 400 }
      );
    }

    // session_details is only required for new sessions
    if (!session_id && !session_details) {
      return NextResponse.json(
        { 
          success: false,
          error: 'session_details is required when creating new sessions (no session_id provided)'
        },
        { status: 400 }
      );
    }

    // Validate session_id format if provided
    if (session_id && (typeof session_id !== 'string' || session_id.trim().length === 0)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'session_id must be a non-empty string',
          received: typeof session_id
        },
        { status: 400 }
      );
    }

    // Validate session_details structure only if provided
    if (session_details) {
      if (typeof session_details !== 'object' || session_details === null) {
        return NextResponse.json(
          { 
            success: false,
            error: 'session_details must be an object'
          },
          { status: 400 }
        );
      }

      const { ip_address, location, browser_type, device_type } = session_details;
      
      // Check for required fields
      const missingFields = [];
      if (!ip_address) missingFields.push('ip_address');
      if (!location) missingFields.push('location');
      if (!browser_type) missingFields.push('browser_type');
      if (!device_type) missingFields.push('device_type');

      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Missing required fields in session_details',
            missing_fields: missingFields,
            received_fields: Object.keys(session_details)
          },
          { status: 400 }
        );
      }

      // Validate field types
      const typeErrors = [];
      if (typeof ip_address !== 'string') typeErrors.push('ip_address must be string');
      if (typeof location !== 'string') typeErrors.push('location must be string');
      if (typeof browser_type !== 'string') typeErrors.push('browser_type must be string');
      if (typeof device_type !== 'string') typeErrors.push('device_type must be string');

      if (typeErrors.length > 0) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Invalid field types in session_details',
            type_errors: typeErrors
          },
          { status: 400 }
        );
      }

      // Validate device_type enum
      if (!['Desktop', 'Mobile', 'Tablet'].includes(device_type)) {
        return NextResponse.json(
          { 
            success: false,
            error: 'device_type must be one of: Desktop, Mobile, or Tablet',
            received: device_type
          },
          { status: 400 }
        );
      }
    }

    // Validate analytics structure
    if (!Array.isArray(analytics)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'analytics must be an array',
          received: typeof analytics
        },
        { status: 400 }
      );
    }

    if (analytics.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'analytics array cannot be empty'
        },
        { status: 400 }
      );
    }

    // Validate each analytics entry
    for (let i = 0; i < analytics.length; i++) {
      const analytic = analytics[i];
      
      if (typeof analytic !== 'object' || analytic === null) {
        return NextResponse.json(
          { 
            success: false,
            error: `Analytics entry at index ${i} must be an object`,
            index: i
          },
          { status: 400 }
        );
      }

      if (!analytic.page_name || typeof analytic.page_name !== 'string') {
        return NextResponse.json(
          { 
            success: false,
            error: `Analytics entry at index ${i} must have a valid page_name string`,
            index: i,
            received_page_name: typeof analytic.page_name
          },
          { status: 400 }
        );
      }

      if (!Array.isArray(analytic.page_sections)) {
        return NextResponse.json(
          { 
            success: false,
            error: `Analytics entry at index ${i} must have page_sections array`,
            index: i,
            received_page_sections: typeof analytic.page_sections
          },
          { status: 400 }
        );
      }

      // Validate page_sections
      for (let j = 0; j < analytic.page_sections.length; j++) {
        const section = analytic.page_sections[j];
        
        if (typeof section !== 'object' || section === null) {
          return NextResponse.json(
            { 
              success: false,
              error: `Page section at index ${j} in analytics entry ${i} must be an object`,
              analytics_index: i,
              section_index: j
            },
            { status: 400 }
          );
        }

        if (!section.name || typeof section.name !== 'string') {
          return NextResponse.json(
            { 
              success: false,
              error: `Page section at index ${j} in analytics entry ${i} must have a valid name string`,
              analytics_index: i,
              section_index: j,
              received_name: typeof section.name
            },
            { status: 400 }
          );
        }

        if (typeof section.duration !== 'number' || section.duration < 0 || !isFinite(section.duration)) {
          return NextResponse.json(
            { 
              success: false,
              error: `Page section at index ${j} in analytics entry ${i} must have a non-negative finite number duration`,
              analytics_index: i,
              section_index: j,
              received_duration: typeof section.duration,
              duration_value: section.duration
            },
            { status: 400 }
          );
        }
      }
    }

    let session: Session | null;

    try {
      if (session_id) {
        console.log(`🔄 Updating existing session: ${session_id}`);
        
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
            { 
              success: false,
              error: 'Session not found',
              session_id: session_id
            },
            { status: 404 }
          );
        }
        
        console.log(`✅ Session updated successfully: ${session_id}`);
      } else {
        console.log('🆕 Creating new session');
        
        // Create new session
        const newSessionId = generateSessionId();
        console.log(`🆔 Generated new session ID: ${newSessionId}`);
        
        session = await Visitor.create({
          session_id: newSessionId,
          session_details,
          analytics
        });
        
        console.log(`✅ New session created successfully: ${newSessionId}`);
      }

      return NextResponse.json({
        success: true,
        message: session_id ? 'Session updated successfully' : 'Session created successfully',
        data: session!
      }, { status: 200 });

    } catch (dbError) {
      console.error('💥 Database operation error:', dbError);
      
      // Handle specific database errors
      if (dbError instanceof Error) {
        if (dbError.message.includes('duplicate key')) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Session ID already exists',
              session_id: session_id,
              details: 'Try using a different session_id or update the existing session'
            },
            { status: 409 }
          );
        }
        
        if (dbError.message.includes('validation')) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Data validation failed',
              details: dbError.message
            },
            { status: 422 }
          );
        }
      }
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Database operation failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('💥 Unexpected error in POST /api/visitors:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET endpoint - Retrieve visitor sessions
export async function GET(request: NextRequest) {
  try {
    console.log('📡 GET /api/visitors called');

    // Parse URL with error handling
    let url;
    try {
      url = new URL(request.url);
    } catch (urlError) {
      console.error('❌ Invalid URL:', urlError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request URL',
          details: urlError instanceof Error ? urlError.message : 'Unknown URL error'
        },
        { status: 400 }
      );
    }

    const { searchParams } = url;
    const session_id = searchParams.get('session_id');
    
    // Validate pagination parameters
    let page, per_page, limit, skip;
    
    try {
      const pageParam = searchParams.get('page') || '1';
      const perPageParam = searchParams.get('per_page') || '10';
      
      page = parseInt(pageParam);
      per_page = parseInt(perPageParam);
      
      // Validate page number
      if (isNaN(page) || page < 1) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Invalid page parameter',
            received: pageParam,
            expected: 'positive integer'
          },
          { status: 400 }
        );
      }
      
      // Validate per_page number
      if (isNaN(per_page) || per_page < 1 || per_page > 100) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Invalid per_page parameter',
            received: perPageParam,
            expected: 'integer between 1 and 100'
          },
          { status: 400 }
        );
      }
      
      limit = Math.min(per_page, 100); // Max 100 items per page
      skip = (page - 1) * limit;
      
    } catch (parseError) {
      console.error('❌ Parameter parsing error:', parseError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to parse pagination parameters',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
        },
        { status: 400 }
      );
    }

    // Validate session_id format if provided
    if (session_id && (typeof session_id !== 'string' || session_id.trim().length === 0)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'session_id must be a non-empty string',
          received: typeof session_id
        },
        { status: 400 }
      );
    }

    let query = {};

    try {
      // If session_id is provided, get specific session
      if (session_id) {
        console.log(`🔍 Looking for session: ${session_id}`);
        
        const session = await Visitor.findOne({ session_id });
        
        if (!session) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Session not found',
              session_id: session_id
            },
            { status: 404 }
          );
        }

        console.log(`✅ Session found: ${session_id}`);
        return NextResponse.json({
          success: true,
          message: 'Session retrieved successfully',
          data: session
        }, { status: 200 });
      }

      // Get paginated list of sessions
      console.log(`📄 Fetching sessions - page: ${page}, limit: ${limit}, skip: ${skip}`);
      
      const sessions = await Visitor.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);

      const total_count = await Visitor.countDocuments(query);
      const total_pages = Math.ceil(total_count / limit);

      console.log(`✅ Retrieved ${sessions.length} sessions out of ${total_count} total`);

      return NextResponse.json({
        success: true,
        message: "Visitors retrieved successfully",
        results: sessions,
        pagination: {
          current_page: page,
          total_pages,
          per_page: limit,
          total_count,
        }
      }, { status: 200 });

    } catch (dbError) {
      console.error('💥 Database operation error:', dbError);
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Database operation failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('💥 Unexpected error in GET /api/visitors:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
