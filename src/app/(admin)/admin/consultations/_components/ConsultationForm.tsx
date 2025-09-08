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
  budget: string;
  timeline: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'cancelled';
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
      budget: instance?.budget || "",
      timeline: instance?.timeline || "",
      description: instance?.description || "",
      status: instance?.status || "new" as 'new' | 'in-progress' | 'completed' | 'cancelled',
    },

    validationSchema: ConsultationAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        if (instance) {
          // Update existing consultation
          await updateConsultationMutation(data);
          toast.success('Consultation updated successfully!');
        } else {
          // Create new consultation
          await mutateAsync(data);
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

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget Range <span className="text-red-500">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Budget</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="over-100k">Over $100,000</option>
              </select>
              {Boolean(errors.budget) && touched.budget && (
                <p className="text-red-500 text-sm mt-1">{String(errors.budget)}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeline <span className="text-red-500">*</span>
              </label>
              <select
                id="timeline"
                name="timeline"
                value={values.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 Month</option>
                <option value="2-3-months">2-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="6-months-plus">6+ Months</option>
                <option value="flexible">Flexible</option>
              </select>
              {Boolean(errors.timeline) && touched.timeline && (
                <p className="text-red-500 text-sm mt-1">{String(errors.timeline)}</p>
              )}
            </div>
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
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
