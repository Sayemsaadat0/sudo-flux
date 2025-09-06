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
import { useAddContact, useUpdateContact } from "@/hooks/contacts.hooks";
import { ContactAddEditFormValidation } from "@/lib/validate/contact.validate";

interface ContactInstance {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  createdAt?: string;
  updatedAt?: string;
}

interface ContactFormProps {
  instance?: ContactInstance;
}

const ContactForm = ({ instance }: ContactFormProps) => {
  const { mutateAsync } = useAddContact()
  const { mutateAsync: updateContactMutation } = useUpdateContact(instance?._id || '')
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
      subject: instance?.subject || "",
      message: instance?.message || "",
      status: instance?.status || "new",
    },

    validationSchema: ContactAddEditFormValidation,
    onSubmit: async (data: any) => {
      try {
        // Create FormData object for multipart/form-data
        const formData = new FormData();
        
        // Add all text fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (data.phone) formData.append('phone', data.phone);
        if (data.subject) formData.append('subject', data.subject);
        formData.append('message', data.message);
        formData.append('status', data.status);

        if (instance) {
          // Update existing contact
          await updateContactMutation(formData);
          toast.success('Contact updated successfully!');
        } else {
          // Create new contact
          await mutateAsync(formData);
          toast.success('Contact created successfully!');
          resetForm();
        }

        // Close dialog
        setIsDialogOpen(false);
      } catch (err: any) {
        console.error('Error submitting contact:', err);
        toast.error('Failed to save contact. Please try again.');
      }
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!instance && (
        <DialogTrigger asChild>
          <Button label='Create New Contact' variant={'primarybtn'} />
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
                {instance ? 'Edit Contact' : 'Create New Contact'}
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

          {/* Phone and Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <TextInput
                className="w-full"
                id="phone"
                name="phone"
                placeholder="Enter phone number..."
                value={values.phone}
                onChange={handleChange}
                type="tel"
                error={Boolean(errors.phone) && touched.phone ? String(errors.phone) : false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <TextInput
                className="w-full"
                id="subject"
                name="subject"
                placeholder="Enter subject..."
                value={values.subject}
                onChange={handleChange}
                type="text"
                error={Boolean(errors.subject) && touched.subject ? String(errors.subject) : false}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <TextAreaInput
              id="message"
              name="message"
              placeholder="Enter your message..."
              className="min-h-32"
              onChange={handleChange}
              value={values.message}
              error={Boolean(errors.message) && touched.message ? String(errors.message) : false}
              required
              rows={6}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
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
                  : (instance ? "Update Contact" : "Create Contact")
              }
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
