import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIndustry extends Document {
  title: string;
  description: string;
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    publish: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const Industry: Model<IIndustry> =
  mongoose.models.Industry || mongoose.model<IIndustry>("Industry", IndustrySchema);