import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  subTitle: string;
  statsString: string;
  description: string;
  benefits: string[];
  category: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    subTitle: { 
      type: String, 
      required: true, 
      trim: true 
    },
    statsString: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    benefits: [{ 
      type: String, 
      required: true 
    }],
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
