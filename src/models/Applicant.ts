import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplicant extends Document {
  name: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resumeFile: string; // URL to uploaded file
  careerId: string; // Reference to Career
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export const ApplicantSchema = new Schema<IApplicant>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    coverLetter: { type: String, trim: true },
    resumeFile: { type: String, required: true, trim: true },
    careerId: { type: String, required: true, trim: true },
    status: { 
      type: String, 
      enum: ["pending", "reviewed", "accepted", "rejected"], 
      default: "pending" 
    },
  },
  { timestamps: true }
);

// Avoid model overwrite issues in dev with Next.js hot reload
export const Applicant: Model<IApplicant> =
  mongoose.models.Applicant || mongoose.model<IApplicant>("Applicant", ApplicantSchema);
