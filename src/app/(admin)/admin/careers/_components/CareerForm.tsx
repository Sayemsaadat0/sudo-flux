'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { CareerAddEditFormValidation } from "@/lib/validate/career.validate";
import RichTextEditor from "@/components/core/input/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { useAddCareer, useUpdateCareer, CareerResponseType } from "@/hooks/careers.hooks";

interface CareerFormProps {
  instance?: CareerResponseType;
}

const CareerForm = ({ instance }: CareerFormProps) => {
  const { mutateAsync } = useAddCareer();
  const { mutateAsync: updateCareerMutation } = useUpdateCareer(instance?._id || '');
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
      department: instance?.department || "",
      location: instance?.location || "",
      type: instance?.type || "full_time",
      description: instance?.description || "",
      responsibilities: instance?.responsibilities || [],
      requirements: instance?.requirements || [],
      status: instance?.status || "open",
    },

    validationSchema: CareerAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        if (instance) {
          // Update existing career
          await updateCareerMutation(data);
          toast.success('Career updated successfully!');
        } else {
          // Create new career
          await mutateAsync(data);
          toast.success('Career created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting career:', err);
        toast.error('Failed to save career. Please try again.');
      }
    },
  });

  // Handle responsibilities array
  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...values.responsibilities];
    newResponsibilities[index] = value;
    setFieldValue('responsibilities', newResponsibilities);
  };

  const addResponsibility = () => {
    setFieldValue('responsibilities', [...values.responsibilities, '']);
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = values.responsibilities.filter((_: any, i: number) => i !== index);
    setFieldValue('responsibilities', newResponsibilities);
  };

  // Handle requirements array
  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...values.requirements];
    newRequirements[index] = value;
    setFieldValue('requirements', newRequirements);
  };

  const addRequirement = () => {
    setFieldValue('requirements', [...values.requirements, '']);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = values.requirements.filter((_: any, i: number) => i !== index);
    setFieldValue('requirements', newRequirements);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Career' variant={'primarybtn'} />
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
              <span className="text-sm">{instance ? '✏️' : '💼'}</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {instance ? 'Edit Career Position' : 'Create New Career Position'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="title"
                name="title"
                placeholder="e.g., Senior Software Engineer"
                value={values.title}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <TextInput
                className="w-full"
                id="department"
                name="department"
                placeholder="e.g., Engineering, Marketing"
                value={values.department}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.department) && touched.department ? String(errors.department) : false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <TextInput
                className="w-full"
                id="location"
                name="location"
                placeholder="e.g., New York, Remote"
                value={values.location}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.location) && touched.location ? String(errors.location) : false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                id="type"
                name="type"
                value={values.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={values.description}
              onChange={(value) => setFieldValue('description', value)}
              placeholder="Describe the role, company culture, and what makes this position exciting..."
              error={Boolean(errors.description) && touched.description ? String(errors.description) : false}
              required
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Responsibilities</label>
            <div className="space-y-2">
              {values.responsibilities.map((responsibility: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <TextInput
                    className="flex-1"
                    placeholder={`Responsibility ${index + 1}`}
                    value={responsibility}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addResponsibility}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus size={16} />
                Add Responsibility
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
            <div className="space-y-2">
              {values.requirements.map((requirement: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <TextInput
                    className="flex-1"
                    placeholder={`Requirement ${index + 1}`}
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus size={16} />
                Add Requirement
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={values.status === "open"}
              onChange={(e) => setFieldValue('status', e.target.checked ? 'open' : 'closed')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="status" className="text-sm font-medium text-gray-700 cursor-pointer">
              Position is currently open for applications
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
                  : (instance ? "Update Career" : "Create Career")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CareerForm;
