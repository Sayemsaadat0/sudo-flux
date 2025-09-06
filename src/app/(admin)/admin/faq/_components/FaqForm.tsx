'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import TextInput from '@/components/core/input/TextInput';
import TextAreaInput from '@/components/core/input/TextAreaInput';
import { useAddFaq, useUpdateFaq, FaqResponseType } from '@/hooks/faq.hooks';
import { FaqAddEditFormValidation } from '@/lib/validate/faq.validate';
import { Edit, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/ui/button';

interface FaqFormProps {
  instance?: FaqResponseType;
}

const FaqForm: React.FC<FaqFormProps> = ({ instance }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync } = useAddFaq();
  const { mutateAsync: updateFaqMutation } = useUpdateFaq();

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
      question: instance?.question || '',
      answer: instance?.answer || '',
      category: instance?.category || 'general',
      publish: instance?.publish ?? true,
    },
    validationSchema: FaqAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Create FormData object
        const formData = new FormData();
        
        // Append form fields
        formData.append('question', data.question);
        formData.append('answer', data.answer);
        formData.append('category', data.category);
        formData.append('publish', data.publish.toString());

        if (instance) {
          // Update existing FAQ
          await updateFaqMutation({ id: instance._id, formData });
          toast.success('FAQ updated successfully!');
        } else {
          // Create new FAQ
          await mutateAsync(formData);
          toast.success('FAQ created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting FAQ:', err);
        toast.error('Failed to save FAQ. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New FAQ' variant={'primarybtn'} />
        </DialogTrigger>
      )}
      {instance && (
        <DialogTrigger asChild>
          <Edit size={16} className="text-green-500" />
        </DialogTrigger>
      )}
      
      <DialogContent className="min-w-[90%] md:min-w-2xl lg:min-w-3xl bg-white max-h-[90vh] overflow-y-auto border-0 shadow-lg p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 text-white p-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
              <HelpCircle size={16} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {instance ? 'Edit FAQ' : 'Create New FAQ'}
              </h2>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <TextInput
              className="w-full"
              id="question"
              name="question"
              placeholder="Enter the question"
              value={values.question}
              onChange={handleChange}
              type="text"
              error={Boolean(errors.question) && touched.question ? String(errors.question) : false}
              required
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer <span className="text-red-500">*</span>
            </label>
            <TextAreaInput
              id="answer"
              name="answer"
              placeholder="Enter the detailed answer"
              value={values.answer}
              onChange={handleChange}
              error={Boolean(errors.answer) && touched.answer ? String(errors.answer) : false}
              rows={4}
              required
            />
          </div>

          {/* Category and Publish */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={values.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sudo-purple-3 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="about-us">About Us</option>
                <option value="career">Career</option>
              </select>
              {Boolean(errors.category) && touched.category && (
                <p className="text-red-500 text-xs mt-1">{String(errors.category)}</p>
              )}
            </div>
            
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
                Publish FAQ
              </label>
            </div>
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 hover:from-sudo-purple-6 hover:to-sudo-blue-6 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm"
              type="submit"
              label={
                isSubmitting
                  ? (instance ? "Updating..." : "Creating...")
                  : (instance ? "Update FAQ" : "Create FAQ")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FaqForm;