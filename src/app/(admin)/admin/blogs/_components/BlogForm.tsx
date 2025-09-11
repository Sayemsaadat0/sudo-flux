'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import ImgUploadField from "@/components/core/ImgUploadField";
import { toast } from "sonner";
import { BlogAddEditFormValidation } from "@/lib/validate/blogs.validate";
import TextAreaInput from "@/components/core/input/TextAreaInput";
import RichTextEditor from "@/components/core/input/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useAddBlog, useUpdateBlog } from "@/hooks/blogs.hooks";


interface BlogInstance {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  banner_image?: string | File | null;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogFormProps {
  instance?: BlogInstance;
}

const BlogForm = ({ instance }: BlogFormProps) => {
  // const createBlogMutation = useCreateBlog();
  // const updateBlogMutation = useUpdateBlog();
  const { mutateAsync } = useAddBlog()
  const { mutateAsync: updateBlogMutation } = useUpdateBlog(instance?._id || '')
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const {
    handleChange,
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      title: instance?.title || "",
      content: instance?.content || "",
      author: instance?.author || "",
      tags: instance?.tags ? instance.tags.join(', ') : "",
      published: instance?.published ?? true,
      metaTitle: instance?.metaTitle || "",
      metaDescription: instance?.metaDescription || "",
      slug: instance?.slug || "",
      banner_image: instance?.banner_image || null,
    },

    validationSchema: BlogAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Create FormData object for multipart/form-data
        const formData = new FormData();

        // Add all text fields
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.author) formData.append('author', data.author);

        // Process tags - convert comma-separated string to array
        const tagsArray = data.tags ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [];
        if (tagsArray.length > 0) {
          formData.append('tags', JSON.stringify(tagsArray));
        }

        formData.append('published', data.published.toString());
        if (data.metaTitle) formData.append('metaTitle', data.metaTitle);
        if (data.metaDescription) formData.append('metaDescription', data.metaDescription);
        if (data.slug) formData.append('slug', data.slug);

        // Add banner image if it's a File object
        if (data.banner_image && data.banner_image instanceof File) {
          formData.append('banner_image', data.banner_image);
        }

        if (instance) {
          // Update existing blog
          await updateBlogMutation(formData);
          toast.success('Blog updated successfully!');
        } else {
          // Create new blog
          await mutateAsync(formData);
          toast.success('Blog created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting blog:', err);
        toast.error('Failed to save blog. Please try again.');
      }
    },
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    handleChange(e);
    setFieldValue('slug', generateSlug(title));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Blog Post' variant={'primarybtn'} />
        </DialogTrigger>
      )}
      {instance && (
        <DialogTrigger asChild>
          <Edit size={16} className="text-green-500" />
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[90%] md:min-w-2xl lg:min-w-3xl bg-white max-h-[90vh] overflow-y-auto border-0 shadow-lg p-0">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <span className="text-sm">{instance ? '✏️' : '✨'}</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {instance ? 'Edit Blog Post' : 'Create New Blog Post'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <ImgUploadField
              error={Boolean(errors.banner_image) && touched.banner_image ? String(errors.banner_image) : false}
              setValue={(x: any) => setFieldValue('banner_image', x)}
              value={values.banner_image}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <TextInput
              className="w-full"
              id="title"
              name="title"
              placeholder="Enter blog title..."
              value={values.title}
              onChange={handleTitleChange}
              type="text"
              error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
              required
            />
          </div>

          {/* Slug - Hidden */}
          <div className="hidden">
            <TextInput
              className="w-full"
              id="slug"
              name="slug"
              label="Slug"
              value={values.slug}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.slug) && touched.slug ? String(errors.slug) : false}
            />
          </div>

          {/* Author and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <TextInput
                className="w-full"
                id="author"
                name="author"
                placeholder="Author name"
                value={values.author}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.author) && touched.author ? String(errors.author) : false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <TextInput
                className="w-full"
                id="tags"
                name="tags"
                placeholder="tag1, tag2, tag3"
                value={values.tags}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.tags) && touched.tags ? String(errors.tags) : false}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={values.content}
              onChange={(value) => setFieldValue('content', value)}
              placeholder="Write your blog content here..."
              error={Boolean(errors.content) && touched.content ? String(errors.content) : false}
              required
            />
          </div>

          {/* SEO Fields */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <TextInput
                className="w-full"
                id="metaTitle"
                name="metaTitle"
                placeholder="SEO title..."
                value={values.metaTitle}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.metaTitle) && touched.metaTitle ? String(errors.metaTitle) : false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <TextAreaInput
                id="metaDescription"
                name="metaDescription"
                placeholder="SEO description..."
                className="min-h-16"
                onChange={handleChange}
                value={values.metaDescription}
                error={Boolean(errors.metaDescription) && touched.metaDescription ? String(errors.metaDescription) : false}
                rows={2}
              />
            </div>
          </div>

          {/* Publish Settings */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={values.published}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700 cursor-pointer">
              Publish immediately
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outlineBtn"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium rounded-lg text-sm"
              type="button"
              label="Cancel"
              onClick={() => setIsDialogOpen(false)}
            />
            <Button
              disabled={isSubmitting}
              variant="primarybtn"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm"
              type="submit"
              label={
                isSubmitting
                  ? (instance ? "Updating..." : "Publishing...")
                  : (instance ? "Update Blog" : "Publish Blog")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogForm;