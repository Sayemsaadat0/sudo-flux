import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Avoid model overwrite issues in dev with Next.js hot reload
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
