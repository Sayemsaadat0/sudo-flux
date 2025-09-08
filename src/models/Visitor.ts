import mongoose, { Document, Schema } from 'mongoose';

// Type definitions for visitor analytics
export type PageSection = {
  name: string;
  previous_section: string | null;
  duration: number; // store in seconds for calculations
};

export type PageAnalytics = {
  page_name: string;
  previous_page: string | null;
  page_sections: PageSection[];
};

export type SessionDetails = {
  ip_address: string;   // anonymized if needed for GDPR
  location: string;     // "City, Country" (from IP)
  browser_type: string; // e.g., "Chrome 139.0.0"
  device_type: "Desktop" | "Mobile" | "Tablet";
};

export type Session = {
  session_id: string;   // 9-digit unique session id
  session_details: SessionDetails;
  created_at?: Date;
  updated_at?: Date;
  analytics: PageAnalytics[];
};

// Mongoose schema for Session
const PageSectionSchema = new Schema({
  name: { type: String, required: true },
  previous_section: { type: String, default: null },
  duration: { type: Number, required: true, min: 0 } // duration in seconds
}, { _id: false });

const PageAnalyticsSchema = new Schema({
  page_name: { type: String, required: true },
  previous_page: { type: String, default: null },
  page_sections: [PageSectionSchema]
}, { _id: false });

const SessionDetailsSchema = new Schema({
  ip_address: { type: String, required: true },
  location: { type: String, required: true },
  browser_type: { type: String, required: true },
  device_type: { 
    type: String, 
    required: true, 
    enum: ["Desktop", "Mobile", "Tablet"] 
  }
}, { _id: false });

const SessionSchema = new Schema({
  session_id: { 
    type: String, 
    required: true, 
    unique: true,
    length: 9 // 9-digit unique session id
  },
  session_details: { type: SessionDetailsSchema, required: true },
  analytics: [PageAnalyticsSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Create and export the model
export interface ISession extends Session, Document {}
export const Visitor = mongoose.models.Visitor || mongoose.model<ISession>('Visitor', SessionSchema);
