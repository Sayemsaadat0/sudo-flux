'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import TextAreaInput from "@/components/core/input/TextAreaInput";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { ConsultationAddEditFormValidation } from "@/lib/validate/consultation.validate";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useAddConsultation, useUpdateConsultation } from "@/hooks/consultations.hooks";

interface ConsultationInstance {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  description: string;
  status?: 'new' | 'in-progress' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

interface ConsultationFormProps {
  instance?: ConsultationInstance;
}

const ConsultationForm = ({ instance }: ConsultationFormProps) => {
  const { mutateAsync } = useAddConsultation();
  const { mutateAsync: updateConsultationMutation } = useUpdateConsultation(instance?._id || '');
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
      email: instance?.email || "",
      phone: instance?.phone || "",
      company: instance?.company || "",
      projectType: instance?.projectType || "",
      description: instance?.description || "",
      status: instance?.status || "new" as 'new' | 'in-progress' | 'completed' | 'cancelled',
    },

    validationSchema: ConsultationAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Filter data to only include fields expected by the API
        const { status, ...apiData } = data;
        
        if (instance) {
          // Update existing consultation - include status for updates
          await updateConsultationMutation({ ...apiData, status });
          toast.success('Consultation updated successfully!');
        } else {
          // Create new consultation - only send required fields
          await mutateAsync(apiData);
          toast.success('Consultation created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting consultation:', err);
        toast.error(err?.response?.data?.message || 'Failed to save consultation. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Consultation' variant={'primarybtn'} />
        </DialogTrigger>
      )}
      {instance && (
        <DialogTrigger asChild>
          <Edit size={16} className="text-green-500" />
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[90%] md:min-w-2xl lg:min-w-4xl bg-white max-h-[90vh] overflow-y-auto border-0 shadow-lg p-0">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <span className="text-sm">{instance ? '✏️' : '✨'}</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {instance ? 'Edit Consultation' : 'Create New Consultation'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="name"
                name="name"
                placeholder="Enter full name..."
                value={values.name}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.name) && touched.name ? String(errors.name) : false}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="email"
                name="email"
                placeholder="Enter email address..."
                value={values.email}
                onChange={handleChange}
                type="email"
                error={Boolean(errors.email) && touched.email ? String(errors.email) : false}
                required
              />
            </div>
          </div>

          {/* Phone and Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="phone"
                name="phone"
                placeholder="Enter phone number..."
                value={values.phone}
                onChange={handleChange}
                type="tel"
                error={Boolean(errors.phone) && touched.phone ? String(errors.phone) : false}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <TextInput
                className="w-full"
                id="company"
                name="company"
                placeholder="Enter company name..."
                value={values.company}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.company) && touched.company ? String(errors.company) : false}
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type <span className="text-red-500">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={values.projectType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Project Type</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile App Development</option>
              <option value="e-commerce">E-commerce Solution</option>
              <option value="ui-ux-design">UI/UX Design</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="consulting">IT Consulting</option>
              <option value="other">Other</option>
            </select>
            {Boolean(errors.projectType) && touched.projectType && (
              <p className="text-red-500 text-sm mt-1">{String(errors.projectType)}</p>
            )}
          </div>


          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description <span className="text-red-500">*</span>
            </label>
            <TextAreaInput
              id="description"
              name="description"
              placeholder="Enter project description..."
              className="min-h-32"
              onChange={handleChange}
              value={values.description}
              error={Boolean(errors.description) && touched.description ? String(errors.description) : false}
              required
              rows={6}
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
                  : (instance ? "Update Consultation" : "Create Consultation")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationForm;
