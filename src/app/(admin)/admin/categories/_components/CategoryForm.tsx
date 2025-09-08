'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { CategoryAddEditFormValidation } from "@/lib/validate/category.validate";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useAddCategory, useUpdateCategory } from "@/hooks/categories.hooks";

interface CategoryInstance {
  _id?: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryFormProps {
  instance?: CategoryInstance;
}

const CategoryForm = ({ instance }: CategoryFormProps) => {
  const { mutateAsync } = useAddCategory();
  const { mutateAsync: updateCategoryMutation } = useUpdateCategory(instance?._id || '');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const {
    handleChange,
    values,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      name: instance?.name || "",
      status: instance?.status || "active" as 'active' | 'inactive',
    },

    validationSchema: CategoryAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        if (instance) {
          // Update existing category
          await updateCategoryMutation(data);
          toast.success('Category updated successfully!');
        } else {
          // Create new category
          await mutateAsync(data);
          toast.success('Category created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting category:', err);
        toast.error(err?.response?.data?.message || 'Failed to save category. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Category' variant={'primarybtn'} />
        </DialogTrigger>
      )}
      {instance && (
        <DialogTrigger asChild>
          <Edit size={16} className="text-green-500" />
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[90%] md:min-w-md lg:min-w-lg bg-white max-h-[90vh] overflow-y-auto border-0 shadow-lg p-0">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <span className="text-sm">{instance ? '✏️' : '✨'}</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {instance ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <TextInput
              className="w-full"
              id="name"
              name="name"
              placeholder="Enter category name..."
              value={values.name}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.name) && touched.name ? String(errors.name) : false}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {Boolean(errors.status) && touched.status && (
              <p className="text-red-500 text-sm mt-1">{String(errors.status)}</p>
            )}
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
                  ? (instance ? "Updating..." : "Creating...")
                  : (instance ? "Update Category" : "Create Category")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
