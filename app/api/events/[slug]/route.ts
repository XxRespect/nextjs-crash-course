import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * 
 * @param request - Next.js request object
 * @param context - Route context containing dynamic parameters
 * @returns Event data or error response
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // Extract slug from route parameters
    const { slug } = await context.params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { 
          message: 'Invalid slug parameter',
          error: 'Slug must be a non-empty string'
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric with hyphens only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { 
          message: 'Invalid slug format',
          error: 'Slug must contain only lowercase letters, numbers, and hyphens'
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { 
          message: 'Event not found',
          error: `No event found with slug: ${slug}`
        },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      { 
        success: true,
        event 
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    // Log error for debugging
    console.error('Error fetching event by slug:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes('MONGODB_URI') || error.message.includes('connect')) {
        return NextResponse.json(
          { 
            message: 'Database connection error',
            error: 'Unable to connect to database'
          },
          { status: 503 }
        );
      }

      // Mongoose validation errors
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return NextResponse.json(
          { 
            message: 'Invalid request',
            error: error.message
          },
          { status: 400 }
        );
      }
    }

    // Generic server error
    return NextResponse.json(
      { 
        message: 'Internal server error',
        error: 'An unexpected error occurred while fetching the event'
      },
      { status: 500 }
    );
  }
}
