import { NextResponse } from 'next/server';
import '@/DB/db'; // ensure DB connection
import { Visitor } from '@/models/Visitor';

// Configure for static export
 

// DELETE endpoint - Delete all visitor sessions
export async function DELETE() {
  try {
    // Get count before deletion for response
    const totalCount = await Visitor.countDocuments();

    // Delete all visitor sessions
    const deleteResult = await Visitor.deleteMany({});

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteResult.deletedCount} visitor sessions`,
      data: {
        deletedCount: deleteResult.deletedCount,
        totalCount: totalCount
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error in DELETE /api/visitors/delete-all:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
