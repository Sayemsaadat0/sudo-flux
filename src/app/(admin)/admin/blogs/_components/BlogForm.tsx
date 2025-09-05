'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import ImgUploadField from "@/components/core/ImgUploadField";
import { toast } from "sonner";
import { BlogAddEditFormValidation } from "@/lib/validate/blogs.validate";
import TextAreaInput from "@/components/core/input/TextAreaInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
        // Prepare form data for mutation
        const blogData = {
          title: data.title,
          content: data.content,
          author: data.author,
          tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [],
          published: data.published,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          slug: data.slug,
          banner_image: data.banner_image,
        };

        if (instance) {
          // Update existing blog
          await updateBlogMutation(blogData)
          // await updateBlogMutation.mutateAsync({
          //   id: instance._id,
          //   formData: blogData
          // });
          toast.success('Blog updated successfully!');
        } else {
          // Create new blog
          await mutateAsync(blogData)
          // await createBlogMutation.mutateAsync(blogData);
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
      <DialogContent className="lg:min-w-6xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{instance ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
          <DialogDescription>
            {instance
              ? 'Update the details below to edit this blog post.'
              : 'Fill in the details below to create a new blog post.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col-reverse xl:flex-row gap-5">
            <div className="w-full xl:w-3/4">
              <div className="space-y-[30px]">
                <div className="bg-white rounded-[16px] space-y-5 p-6">
                  <p className="">Primary Information</p>
                  <div className="flex flex-col gap-y-5">
                    {/* Title */}
                    <div className="w-full">
                      <TextInput
                        className="w-full"
                        id="title"
                        name="title"
                        label="Blog Title (Use SEO Friendly)"
                        value={values.title}
                        onChange={handleTitleChange}
                        type="text"
                        error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div className="w-full hidden">
                      <TextInput
                        className="w-full "
                        id="slug"
                        name="slug"
                        label="Slug"
                        value={values.slug}
                        onChange={handleChange}
                        type="text"
                        // placeholder="Auto-generated from title"
                        error={Boolean(errors.slug) && touched.slug ? String(errors.slug) : false}
                      />
                    </div>

                    {/* Author */}
                    <div className="w-full">
                      <TextInput
                        className="w-full"
                        id="author"
                        name="author"
                        label="Author"
                        value={values.author}
                        onChange={handleChange}
                        type="text"
                        // placeholder="Enter author name"
                        error={Boolean(errors.author) && touched.author ? String(errors.author) : false}
                      />
                    </div>

                    {/* Tags */}
                    <div className="w-full">
                      <TextInput
                        className="w-full"
                        id="tags"
                        name="tags"
                        label="Blog Tags (Use SEO Friendly)"
                        value={values.tags}
                        onChange={handleChange}
                        // placeholder="tag1, tag2, tag3"
                        type="text"
                        error={Boolean(errors.tags) && touched.tags ? String(errors.tags) : false}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <TextAreaInput
                        id="content"
                        name="content"
                        label="Blog Content"
                        className="min-h-40"
                        onChange={handleChange}
                        value={values.content}
                        error={Boolean(errors.content) && touched.content ? String(errors.content) : false}
                        required
                        rows={10}
                      />
                    </div>

                    {/* Meta Title */}
                    <div className="w-full">
                      <TextInput
                        className="w-full"
                        id="metaTitle"
                        name="metaTitle"
                        label="Meta Title (SEO)"
                        value={values.metaTitle}
                        onChange={handleChange}
                        type="text"
                        // placeholder="SEO meta title"
                        error={Boolean(errors.metaTitle) && touched.metaTitle ? String(errors.metaTitle) : false}
                      />
                    </div>

                    {/* Meta Description */}
                    <div>
                      <TextAreaInput
                        id="metaDescription"
                        name="metaDescription"
                        label="Meta Description (SEO)"
                        className="min-h-20"
                        onChange={handleChange}
                        value={values.metaDescription}
                        error={Boolean(errors.metaDescription) && touched.metaDescription ? String(errors.metaDescription) : false}
                        rows={3}
                        placeholder="SEO meta description"
                      />
                    </div>

                    {/* Published Checkbox */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        name="published"
                        checked={values.published}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="published" className="text-sm font-medium">
                        Publish immediately
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/4">
              <div className="bg-white p-6 rounded-[16px]">
                <p className="text-w-title-2-Medium-28 mb-5">Upload Image</p>
                <ImgUploadField
                  error={Boolean(errors.banner_image) && touched.banner_image ? String(errors.banner_image) : false}
                  setValue={(x: any) => setFieldValue('banner_image', x)}
                  value={values.banner_image}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-6">
            <Button
              variant="outlineBtn"
              className="hover:text-white"
              type="button"
              label="Cancel"
              onClick={() => setIsDialogOpen(false)}
            />
            <Button
              disabled={isSubmitting}
              variant="primarybtn"
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