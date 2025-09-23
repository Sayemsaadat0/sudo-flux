'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { LegalFormValidation } from "@/lib/validate/legal.validate";
import RichTextEditor from "@/components/core/input/RichTextEditor";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { useAddLegal, useUpdateLegal, LegalDocument } from "@/hooks/legal.hooks";

interface LegalFormProps {
  instance?: LegalDocument;
  type: "privacy" | "terms" | "license";
  onSuccess?: () => void;
}

const LegalForm = ({ instance, type, onSuccess }: LegalFormProps) => {
  const { mutateAsync: addLegal } = useAddLegal();
  const { mutateAsync: updateLegal } = useUpdateLegal(instance?._id || '');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "privacy": return "Privacy Policy";
      case "terms": return "Terms & Conditions";
      case "license": return "License";
      default: return type;
    }
  };

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
      type: instance?.type || type,
      title: instance?.title || "",
      content: instance?.content || "",
      version: instance?.version || "1.0.0",
      isActive: instance?.isActive ?? false,
    },
    validationSchema: LegalFormValidation,
    enableReinitialize: true,
    onSubmit: async (data) => {
      try {
        if (instance) {
          // Update existing legal document
          await updateLegal({
            _id: instance._id,
            ...data
          });
          toast.success(`${getTypeLabel(data.type)} updated successfully!`);
        } else {
          // Create new legal document
          await addLegal(data);
          toast.success(`${getTypeLabel(data.type)} created successfully!`);
          resetForm();
        }

        // Close dialog and call success callback
        setIsDialogOpen(false);
        onSuccess?.();
      } catch (err: any) {
        console.error('Error submitting legal document:', err);
        toast.error('Failed to save legal document. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button 
            label={`Create ${getTypeLabel(type)}`} 
            variant={'primarybtn'}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Create {getTypeLabel(type)}
          </Button>
        </DialogTrigger>
      )}
      {instance && (
        <DialogTrigger asChild>
          <button className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
        </DialogTrigger>
      )}
      
      <DialogContent className="min-w-[90%] md:min-w-2xl lg:min-w-4xl bg-white max-h-[90vh] overflow-y-auto border-0 shadow-lg p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <span className="text-sm">{instance ? '✏️' : '📄'}</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {instance ? `Edit ${getTypeLabel(type)}` : `Create ${getTypeLabel(type)}`}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Document Type - Hidden for single type forms */}
          <div className="hidden">
            <TextInput
              className="w-full"
              id="type"
              name="type"
              value={values.type}
              onChange={handleChange}
              type="text"
            />
          </div>

          {/* Title and Version */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="title"
                name="title"
                placeholder={`Enter ${getTypeLabel(type).toLowerCase()} title...`}
                value={values.title}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="version"
                name="version"
                placeholder="1.0.0"
                value={values.version}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.version) && touched.version ? String(errors.version) : false}
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={values.content}
              onChange={(value) => setFieldValue('content', value)}
              placeholder={`Write your ${getTypeLabel(type).toLowerCase()} content here...`}
              error={Boolean(errors.content) && touched.content ? String(errors.content) : false}
              required
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={values.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
              Set as active {getTypeLabel(type).toLowerCase()}
            </label>
            <span className="text-xs text-gray-500">
              (Only one document per type can be active)
            </span>
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
                  : (instance ? "Update Document" : "Create Document")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LegalForm;
