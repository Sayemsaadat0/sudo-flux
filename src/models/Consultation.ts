import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConsultation extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      lowercase: true, 
      trim: true 
    },
    phone: { 
      type: String, 
      required: true, 
      trim: true 
    },
    company: { 
      type: String, 
      trim: true 
    },
    projectType: { 
      type: String, 
      required: true, 
      trim: true 
    },
    budget: { 
      type: String, 
      required: true, 
      trim: true 
    },
    timeline: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['new', 'in-progress', 'completed', 'cancelled'], 
      default: 'new' 
    },
  },
  { timestamps: true }
);

export const Consultation: Model<IConsultation> =
  mongoose.models.Consultation || mongoose.model<IConsultation>("Consultation", ConsultationSchema);
