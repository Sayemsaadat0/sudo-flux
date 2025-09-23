import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeam extends Document {
  name: string;
  image?: string;
  title: string;
  linkedin?: string;
  status: "current" | "former";
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    linkedin: { type: String, trim: true },
    status: { 
      type: String, 
      required: true, 
      enum: ["current", "former"],
      default: "current"
    },
  },
  { timestamps: true }
);

export const Team: Model<ITeam> =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);