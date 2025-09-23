import mongoose, { Document, Model, Schema } from "mongoose";

export interface ILegal extends Document {
  type: "privacy" | "terms" | "license";
  title: string;
  content: string;
  version: string;
  isActive: boolean;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LegalSchema = new Schema<ILegal>(
  {
    type: { 
      type: String, 
      required: true, 
      enum: ["privacy", "terms", "license"],
      index: true
    },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    version: { type: String, required: true, default: "1.0.0" },
    isActive: { type: Boolean, required: true, default: true },
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Ensure only one active document per type
LegalSchema.index({ type: 1, isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

export const Legal: Model<ILegal> = mongoose.models.Legal || mongoose.model<ILegal>("Legal", LegalSchema);
