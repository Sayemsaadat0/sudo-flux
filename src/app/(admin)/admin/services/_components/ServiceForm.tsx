'use client';

import React from "react";
import { useFormik } from "formik";
import TextInput from "@/components/core/input/TextInput";
import TextAreaInput from "@/components/core/input/TextAreaInput";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import { ServiceAddEditFormValidation } from "@/lib/validate/service.validate";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus, X } from "lucide-react";
import { useAddService, useUpdateService } from "@/hooks/services.hooks";
import { useGetActiveCategories } from "@/hooks/categories.hooks";

interface ServiceInstance {
  _id?: string;
  title: string;
  subTitle: string;
  statsString: string;
  description: string;
  benefits: string[];
  category: {
    _id: string;
    name: string;
    status: 'active' | 'inactive';
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceFormProps {
  instance?: ServiceInstance;
}

const ServiceForm = ({ instance }: ServiceFormProps) => {
  const { mutateAsync } = useAddService();
  const { mutateAsync: updateServiceMutation } = useUpdateService(instance?._id || '');
  const { data: categoriesData } = useGetActiveCategories();
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
      subTitle: instance?.subTitle || "",
      statsString: instance?.statsString || "",
      description: instance?.description || "",
      benefits: instance?.benefits || [""],
      category: instance?.category?._id || "",
    },

    validationSchema: ServiceAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Filter out empty benefits
        const filteredBenefits = data.benefits.filter((benefit: string) => benefit.trim() !== "");
        
        if (filteredBenefits.length === 0) {
          toast.error("At least one benefit is required");
          return;
        }

        const serviceData = {
          ...data,
          benefits: filteredBenefits,
        };

        if (instance) {
          // Update existing service
          await updateServiceMutation(serviceData);
          toast.success('Service updated successfully!');
        } else {
          // Create new service
          await mutateAsync(serviceData);
          toast.success('Service created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting service:', err);
        toast.error(err?.response?.data?.message || 'Failed to save service. Please try again.');
      }
    },
  });

  const addBenefit = () => {
    setFieldValue('benefits', [...values.benefits, '']);
  };

  const removeBenefit = (index: number) => {
    if (values.benefits.length > 1) {
      const newBenefits = values.benefits.filter((_: string, i: number) => i !== index);
      setFieldValue('benefits', newBenefits);
    }
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...values.benefits];
    newBenefits[index] = value;
    setFieldValue('benefits', newBenefits);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Service' variant={'primarybtn'} />
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
                {instance ? 'Edit Service' : 'Create New Service'}
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title and Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Title <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="title"
                name="title"
                placeholder="Enter service title..."
                value={values.title}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.title) && touched.title ? String(errors.title) : false}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Subtitle <span className="text-red-500">*</span>
              </label>
              <TextInput
                className="w-full"
                id="subTitle"
                name="subTitle"
                placeholder="Enter service subtitle..."
                value={values.subTitle}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.subTitle) && touched.subTitle ? String(errors.subTitle) : false}
                required
              />
            </div>
          </div>

          {/* Stats String */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stats String <span className="text-red-500">*</span>
            </label>
            <TextInput
              className="w-full"
              id="statsString"
              name="statsString"
              placeholder="e.g., 99% Success Rate, 24/7 Support"
              value={values.statsString}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.statsString) && touched.statsString ? String(errors.statsString) : false}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categoriesData?.results?.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {Boolean(errors.category) && touched.category && (
              <p className="text-red-500 text-sm mt-1">{String(errors.category)}</p>
            )}
          </div>

          {/* Description*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Description <span className="text-red-500">*</span>
            </label>
            <TextAreaInput
              id="description"
              name="description"
              placeholder="Describe your service in detail..."
              className="min-h-32"
              onChange={handleChange}
              value={values.description}
              error={Boolean(errors.description) && touched.description ? String(errors.description) : false}
              required
              rows={6}
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benefits <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {values.benefits.map((benefit : any, index : any) => (
                <div key={index} className="flex items-center gap-2">
                  <TextInput
                    className="flex-1"
                    placeholder={`Benefit ${index + 1}...`}
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    type="text"
                  />
                  {values.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
              >
                <Plus size={16} />
                Add Benefit
              </button>
            </div>
            {Boolean(errors.benefits) && touched.benefits && (
              <p className="text-red-500 text-sm mt-1">{String(errors.benefits)}</p>
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
                  : (instance ? "Update Service" : "Create Service")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;