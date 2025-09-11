'use client'
import React from 'react';
import { MapPin, Clock, Briefcase, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { CareerResponseType } from '@/hooks/careers.hooks';
import { useAddApplicant } from '@/hooks/applicants.hooks';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface CareerDetailsSectionProps {
  career: CareerResponseType;
}

// Validation schema for the application form
const ApplicationFormValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number must be at least 10 characters'),
  resume: Yup.mixed()
    .required('Resume is required')
    .test('fileSize', 'File size must be less than 1MB', (value) => {
      if (!value) return true;
      return (value as File).size <= 1024 * 1024; // 1MB
    }),
  coverLetter: Yup.string()
    .optional()
    .max(1000, 'Cover letter must be less than 1000 characters'),
});

const CareerDetailsSection: React.FC<CareerDetailsSectionProps> = ({ career }) => {
  const addApplicantMutation = useAddApplicant();
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'bg-green-100 text-green-600';
      case 'part_time':
        return 'bg-blue-100 text-blue-600';
      case 'contract':
        return 'bg-purple-100 text-purple-600';
      case 'internship':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'Full Time';
      case 'part_time':
        return 'Part Time';
      case 'contract':
        return 'Contract';
      case 'internship':
        return 'Internship';
      default:
        return type;
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
      name: '',
      email: '',
      phone: '',
      resume: null as File | null,
      coverLetter: '',
    },
    validationSchema: ApplicationFormValidation,
    onSubmit: async (data) => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('coverLetter', data.coverLetter || '');
        formData.append('careerId', career._id!);
        formData.append('resume', data.resume!);

        await addApplicantMutation.mutateAsync(formData);
        toast.success('Application submitted successfully! We\'ll review your application and get back to you soon.');
        resetForm();
      } catch (error: any) {
        console.error('Error submitting application:', error);
        toast.error('Failed to submit application. Please try again.');
      }
    },
  });

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/careers"
            className="inline-flex items-center gap-2 text-sudo-purple-6 hover:text-sudo-purple-7 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Careers</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Side - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-sudo-white-2 rounded-2xl p-8 border border-sudo-white-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-sudo-title-28 lg:text-sudo-title-48 font-heading text-sudo-neutral-6 mb-4">
                    {career.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sudo-neutral-4">
                    {career.department && (
                      <div className="flex items-center gap-2">
                        <Briefcase size={18} />
                        <span>{career.department}</span>
                      </div>
                    )}
                    {career.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{career.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span>{getTypeLabel(career.type || 'full_time')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${getTypeColor(career.type || 'full_time')}`}
                  >
                    {getTypeLabel(career.type || 'full_time')}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      career.status === 'open'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {career.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>

              {/* Job Description */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-sudo-neutral-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: career.description }}
                />
              </div>
            </div>

            {/* Responsibilities */}
            {career.responsibilities && career.responsibilities.length > 0 && (
              <div className="bg-sudo-white-2 rounded-2xl p-8 border border-sudo-white-3">
                <h2 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-6">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {career.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-sudo-purple-6 mt-0.5 flex-shrink-0" />
                      <span className="text-sudo-neutral-4">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {career.requirements && career.requirements.length > 0 && (
              <div className="bg-sudo-white-2 rounded-2xl p-8 border border-sudo-white-3">
                <h2 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {career.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-sudo-blue-6 mt-0.5 flex-shrink-0" />
                      <span className="text-sudo-neutral-4">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Side - Application Form */}
          <div className="lg:col-span-1">
            {career.status === 'open' ? (
              <div className="bg-sudo-white-2 rounded-2xl p-8 border border-sudo-white-3 sticky top-8">
                <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-6">Apply for this Position</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-sudo-neutral-6 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.name && touched.name 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-sudo-white-3 focus:border-sudo-purple-6'
                      }`}
                      required
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-sudo-neutral-6 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.email && touched.email 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-sudo-white-3 focus:border-sudo-purple-6'
                      }`}
                      required
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-sudo-neutral-6 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.phone && touched.phone 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-sudo-white-3 focus:border-sudo-purple-6'
                      }`}
                      required
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-sudo-neutral-6 mb-2">
                      Resume <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="file" 
                      name="resume"
                      onChange={(e) => setFieldValue('resume', e.target.files?.[0] || null)}
                      accept=".pdf,.doc,.docx"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.resume && touched.resume 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-sudo-white-3 focus:border-sudo-purple-6'
                      }`}
                      required
                    />
                    <p className="text-sudo-neutral-4 text-sm mt-1">PDF, DOC, or DOCX (Max 1MB)</p>
                    {errors.resume && touched.resume && (
                      <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block text-sm font-medium text-sudo-neutral-6 mb-2">
                      Cover Letter (Optional)
                    </label>
                    <textarea 
                      name="coverLetter"
                      value={values.coverLetter}
                      onChange={handleChange}
                      placeholder="Tell us why you're interested in this position..."
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                        errors.coverLetter && touched.coverLetter 
                          ? 'border-red-400 focus:border-red-400' 
                          : 'border-sudo-white-3 focus:border-sudo-purple-6'
                      }`}
                    />
                    {errors.coverLetter && touched.coverLetter && (
                      <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-xl hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send size={18} />
                    <span className="font-medium">
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-sudo-white-2 rounded-2xl p-8 border border-sudo-white-3 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-red-600" />
                </div>
                <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-2">
                  Position Closed
                </h3>
                <p className="text-sudo-neutral-4 mb-6">
                  This position is no longer accepting applications.
                </p>
                <Link href="/careers">
                  <button className="px-6 py-3 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-xl hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300">
                    View Other Positions
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerDetailsSection;
