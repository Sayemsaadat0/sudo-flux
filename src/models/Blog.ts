import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, trim: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    slug: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Simple slug generator per requirement: lowercase + spaces -> '-'
const toSlug = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

// Ensure slug is set on create/save
BlogSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = toSlug(this.title);
  }
  next();
});

// Ensure slug updates when using findOneAndUpdate / findByIdAndUpdate
BlogSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate() || {};
  // In case $set wrapper is used
  const set = update.$set || update;
  if (set.title) {
    const newSlug = toSlug(set.title);
    if (update.$set) {
      update.$set.slug = newSlug;
    } else {
      update.slug = newSlug;
    }
    this.setUpdate(update);
  }
  next();
});

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);