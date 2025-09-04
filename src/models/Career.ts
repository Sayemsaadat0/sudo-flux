import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICareer extends Document {
  title: string;
  department?: string;
  location?: string;
  type?: "full_time" | "part_time" | "contract" | "internship";
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    type: { type: String, enum: ["full_time", "part_time", "contract", "internship"], default: "full_time" },
    description: { type: String, required: true, trim: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export const Career: Model<ICareer> =
  mongoose.models.Career || mongoose.model<ICareer>("Career", CareerSchema);