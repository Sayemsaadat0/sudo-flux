import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeam extends Document {
  name: string;
  title: string;
  image: string;
  bio?: string;
  socials: {
    name: string;
    url: string;
  }[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    socials: [
      {
        name: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
      },
    ],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Avoid model overwrite issues in dev with Next.js hot reload
export const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
