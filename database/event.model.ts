import mongoose, { Document, Model, Schema } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // ISO format date
  time: string; // Normalized time format (HH:MM)
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Event image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
      trim: true,
    },
    mode: {
      type: String,
      required: [true, 'Event mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be online, offline, or hybrid',
      },
      trim: true,
    },
    audience: {
      type: String,
      required: [true, 'Event audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Event organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Event tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

/**
 * Pre-save hook to:
 * 1. Generate URL-friendly slug from title (only if title changed)
 * 2. Validate and normalize date to ISO format
 * 3. Normalize time to HH:MM format
 */
eventSchema.pre('save', async function () {
  const event = this as IEvent;

  // Generate slug only if title is new or modified
  if (event.isModified('title')) {
    event.slug = event.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Validate and normalize date to ISO format (YYYY-MM-DD)
  if (event.isModified('date')) {
    const dateObj = new Date(event.date);
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format. Please provide a valid date.');
    }

    // Normalize to ISO date format (YYYY-MM-DD)
    event.date = dateObj.toISOString().split('T')[0];
  }

  // Normalize time to HH:MM format
  if (event.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    
    // Try parsing common time formats
    const timeParts = event.time.match(/(\d{1,2}):(\d{2})/);
    
    if (!timeParts) {
      throw new Error('Invalid time format. Expected format: HH:MM (e.g., 14:30)');
    }

    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error('Invalid time. Hours must be 0-23 and minutes must be 0-59.');
    }

    // Normalize to HH:MM format
    event.time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

});

// Prevent model recompilation during hot reload in development
const Event: Model<IEvent> = 
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
