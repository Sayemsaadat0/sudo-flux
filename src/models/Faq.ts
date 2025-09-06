import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: "general" | "about-us" | "career";
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ["general", "about-us", "career"],
      default: "general"
    },
    publish: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const Faq: Model<IFaq> =
  mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);