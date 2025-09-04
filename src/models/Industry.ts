import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIndustry extends Document {
  name: string;
  description?: string;
  icon?: string; // URL or name of icon
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    icon: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Industry: Model<IIndustry> =
  mongoose.models.Industry || mongoose.model<IIndustry>("Industry", IndustrySchema);