import { NextRequest, NextResponse } from 'next/server'
import '@/DB/db' // ensure DB connection
import { Visitor } from '@/models/Visitor'

// GET endpoint - Retrieve visitor by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID parameter
    if (!id) {
      return NextResponse.json(
        { error: 'Visitor ID is required' },
        { status: 400 }
      )
    }

    // Find visitor by ID
    const visitor = await Visitor.findById(id)

    if (!visitor) {
      return NextResponse.json(
        { error: 'Visitor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: visitor
    }, { status: 200 })

  } catch (error) {
    console.error('Error in GET /api/visitors/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT endpoint - Update visitor by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate ID parameter
    if (!id) {
      return NextResponse.json(
        { error: 'Visitor ID is required' },
        { status: 400 }
      )
    }

    // Update visitor
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedVisitor) {
      return NextResponse.json(
        { error: 'Visitor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedVisitor
    }, { status: 200 })

  } catch (error) {
    console.error('Error in PUT /api/visitors/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE endpoint - Delete visitor by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID parameter
    if (!id) {
      return NextResponse.json(
        { error: 'Visitor ID is required' },
        { status: 400 }
      )
    }

    // Delete visitor
    const deletedVisitor = await Visitor.findByIdAndDelete(id)

    if (!deletedVisitor) {
      return NextResponse.json(
        { error: 'Visitor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Visitor deleted successfully'
    }, { status: 200 })

  } catch (error) {
    console.error('Error in DELETE /api/visitors/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}