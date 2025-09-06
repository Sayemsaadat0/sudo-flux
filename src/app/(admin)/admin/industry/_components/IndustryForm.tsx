'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import TextAreaInput from "@/components/core/input/TextAreaInput";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useAddIndustry, useUpdateIndustry } from "@/hooks/industries.hooks";
import { IndustryAddEditFormValidation } from "@/lib/validate/industry.validate";

interface IndustryInstance {
  _id?: string;
  title: string;
  description: string;
  publish: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface IndustryFormProps {
  instance?: IndustryInstance;
}

const IndustryForm = ({ instance }: IndustryFormProps) => {
  const { mutateAsync } = useAddIndustry()
  const { mutateAsync: updateIndustryMutation } = useUpdateIndustry(instance?._id || '')
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
      title: instance?.title || "",
      description: instance?.description || "",
      publish: instance?.publish ?? true,
    },

    validationSchema: IndustryAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Create FormData object for multipart/form-data
        const formData = new FormData();
        
        // Add all text fields
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('publish', data.publish.toString());

        if (instance) {
          // Update existing industry
          await updateIndustryMutation(formData);
          toast.success('Industry updated successfully!');
        } else {
          // Create new industry
          await mutateAsync(formData);
          toast.success('Industry created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting industry:', err);
        toast.error('Failed to save industry. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Industry' variant={'primarybtn'} />
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
                {instance ? 'Edit Industry' : 'Create New Industry'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <TextInput
              className="w-full"
              id="title"
              name="title"
              placeholder="Enter industry title..."
              value={values.title}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <TextAreaInput
              id="description"
              name="description"
              placeholder="Enter industry description..."
              className="min-h-24"
              onChange={handleChange}
              value={values.description}
              error={Boolean(errors.description) && touched.description ? String(errors.description) : false}
              rows={4}
              required
            />
          </div>

          {/* Publish */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <input
              type="checkbox"
              id="publish"
              name="publish"
              checked={values.publish}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="publish" className="text-sm font-medium text-gray-700 cursor-pointer">
              Publish Industry
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
                  ? (instance ? "Updating..." : "Creating...")
                  : (instance ? "Update Industry" : "Create Industry")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IndustryForm;