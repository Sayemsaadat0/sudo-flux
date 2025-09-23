'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import ImgUploadField from "@/components/core/ImgUploadField";
import { toast } from "sonner";
import { TeamAddEditFormValidation } from "@/lib/validate/team.validate";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { useAddTeam, useUpdateTeam } from "@/hooks/teams.hooks";

interface TeamInstance {
  _id?: string;
  name: string;
  image?: string;
  title: string;
  linkedin?: string;
  status: "current" | "former";
  createdAt?: string;
  updatedAt?: string;
}

interface TeamFormProps {
  instance?: TeamInstance;
}

const TeamForm = ({ instance }: TeamFormProps) => {
  const { mutateAsync } = useAddTeam();
  const { mutateAsync: updateTeamMutation } = useUpdateTeam(instance?._id || '');
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
    enableReinitialize: true,
    initialValues: {
      name: instance?.name ?? "",
      title: instance?.title ?? "",
      linkedin: instance?.linkedin ?? "",
      status: instance?.status ?? "current",
      image: instance?.image ?? null,
    },

    validationSchema: TeamAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Create FormData object for multipart/form-data
        const formData = new FormData();

        // Add all text fields
        formData.append('name', data.name);
        formData.append('title', data.title);
        if (data.linkedin) formData.append('linkedin', data.linkedin);
        formData.append('status', data.status);

        // Add image if it's a File object
        if (data.image && data.image instanceof File) {
          formData.append('image', data.image);
        }

        if (instance) {
          // Update existing team member
          await updateTeamMutation(formData);
          toast.success('Team member updated successfully!');
        } else {
          // Create new team member
          await mutateAsync(formData);
          toast.success('Team member created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting team member:', err);
        toast.error('Failed to save team member. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button 
            label='Add Team Member' 
            variant={'primarybtn'}
            icon={<Plus size={16} />}
          />
        </DialogTrigger>
      )}
      {instance && (
        <DialogTrigger asChild>
          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors">
            <Edit size={16} />
          </button>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[90%] md:min-w-2xl lg:min-w-3xl bg-white max-h-[90vh] overflow-y-auto border-0 shadow-lg p-0">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <span className="text-sm">{instance ? '✏️' : '👥'}</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {instance ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form key={instance?._id || 'new'} onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <ImgUploadField
              error={Boolean(errors.image) && touched.image ? String(errors.image) : false}
              setValue={(x: any) => setFieldValue('image', x)}
              value={values.image ?? null}
            />
          </div>

          {/* Name and Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="name"
                name="name"
                placeholder="Enter full name..."
                value={values.name ?? ""}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.name) && touched.name ? String(errors.name) : false}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="title"
                name="title"
                placeholder="e.g., Senior Developer, CEO, Designer"
                value={values.title ?? ""}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
                required
              />
            </div>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
            <TextInput
              className="w-full"
              id="linkedin"
              name="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={values.linkedin ?? ""}
              onChange={handleChange}
              type="url"
              error={Boolean(errors.linkedin) && touched.linkedin ? String(errors.linkedin) : false}
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
              value={values.status ?? "current"}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="current">Current</option>
              <option value="former">Former</option>
            </select>
            {Boolean(errors.status) && touched.status && (
              <p className="text-red-500 text-xs mt-1">{String(errors.status)}</p>
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
                  ? (instance ? "Updating..." : "Adding...")
                  : (instance ? "Update Team Member" : "Add Team Member")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamForm;
