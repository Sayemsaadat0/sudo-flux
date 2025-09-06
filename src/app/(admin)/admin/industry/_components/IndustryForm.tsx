'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import ImgUploadField from "@/components/core/ImgUploadField";
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
  name: string;
  description?: string;
  icon?: string | File | null;
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
    setFieldValue,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      name: instance?.name || "",
      description: instance?.description || "",
      icon: instance?.icon || null,
    },

    validationSchema: IndustryAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Create FormData object for multipart/form-data
        const formData = new FormData();
        
        // Add all text fields
        formData.append('name', data.name);
        if (data.description) formData.append('description', data.description);
        
        // Add icon if it's a File object
        if (data.icon && data.icon instanceof File) {
          formData.append('icon', data.icon);
        }

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
          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Icon</label>
            <ImgUploadField
              error={Boolean(errors.icon) && touched.icon ? String(errors.icon) : false}
              setValue={(x: any) => setFieldValue('icon', x)}
              value={values.icon}
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry Name <span className="text-red-500">*</span>
            </label>
            <TextInput
              className="w-full"
              id="name"
              name="name"
              placeholder="Enter industry name..."
              value={values.name}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.name) && touched.name ? String(errors.name) : false}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <TextAreaInput
              id="description"
              name="description"
              placeholder="Enter industry description..."
              className="min-h-24"
              onChange={handleChange}
              value={values.description}
              error={Boolean(errors.description) && touched.description ? String(errors.description) : false}
              rows={4}
            />
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