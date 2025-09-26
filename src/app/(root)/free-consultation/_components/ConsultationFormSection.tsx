'use client'
import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Send, Calendar, DollarSign, Clock3, Mail } from 'lucide-react';
import Button from '@/components/ui/button';
import LineAnimation from '@/components/animations/LineAnimation';
import { useFormik } from 'formik';
import { useSubmitPublicConsultation } from '@/hooks/consultations.hooks';
import { SuccessToast, ErrorToast } from '@/components/ui/custom-toast';
import * as Yup from 'yup';

// Validation schema for the consultation form
const ConsultationFormValidation = Yup.object({
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
  company: Yup.string().optional(),
  projectType: Yup.string().required('Project type is required'),
  budget: Yup.string().optional(),
  timeline: Yup.string().optional(),
  description: Yup.string()
    .required('Project description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
});

const ConsultationFormSection = () => {
  const { mutateAsync: submitConsultation, isPending } = useSubmitPublicConsultation();
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    handleChange,
    values,
    touched,
    errors,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
    },
    validationSchema: ConsultationFormValidation,
    onSubmit: async (data) => {
      try {
        await submitConsultation(data);
        setShowSuccessToast(true);
        // resetForm();
      } catch (error: any) {
        console.error('Error submitting consultation:', error);
        setErrorMessage(error?.response?.data?.message || 'Failed to submit consultation request. Please try again.');
        setShowErrorToast(true);
      }
    },
  });

  return (
    <section className="bg-gradient-to-br from-sudo-neutral-6 via-sudo-neutral-5 to-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sudo-purple-3/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sudo-blue-3/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sudo-purple-3/5 to-sudo-blue-3/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-sudo-purple-3 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-sudo-blue-3 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-sudo-purple-3 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-sudo-blue-3 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="sudo-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-3 text-lg">Start Your Project Today</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6">
            Get Your Free Project
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sudo-purple-3 to-sudo-blue-3">
              Consultation Now
            </span>
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
            Ready to bring your vision to life? Fill out the form below and we&apos;ll provide you with a detailed consultation and proposal within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Consultation Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-sudo-header-28 font-bold text-sudo-white-1">
                Why Choose Our Consultation?
              </h3>
              <p className="text-sudo-paragraph-20 text-sudo-white-6 leading-relaxed">
                Our expert team will analyze your requirements and provide you with a comprehensive consultation including project scope, timeline, and budget estimation. Get professional insights to make informed decisions.
              </p>
            </div>

            {/* Consultation Benefits */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Free 30-Min Consultation</h4>
                  <p className="text-sudo-white-6">Detailed project discussion and strategic planning</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <DollarSign size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Transparent Pricing</h4>
                  <p className="text-sudo-white-6">Detailed cost breakdown with no hidden fees</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <Clock3 size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Realistic Timeline</h4>
                  <p className="text-sudo-white-6">Accurate project milestones and delivery schedule</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">24-Hour Response</h4>
                  <p className="text-sudo-white-6">Quick turnaround on all consultation requests</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-sudo-paragraph-20 font-semibold mb-4 text-sudo-purple-3 tracking-wide">
                FOLLOW US
              </h4>
              <div className="flex gap-3">
                {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl flex items-center justify-center hover:bg-sudo-purple-5/20 hover:border-sudo-purple-3/50 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-sudo-white-6 group-hover:text-sudo-purple-3 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sudo-header-28 font-bold text-sudo-white-1">
                Get Started Today
              </h3>
              <p className="text-sudo-white-6 text-sm">
                Fill out the form below and we&apos;ll get back to you within 24 hours with a detailed consultation and project proposal.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6 ${
                    errors.name && touched.name 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                  }`}
                  required
                />
                {errors.name && touched.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6 ${
                      errors.email && touched.email 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                    }`}
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6 ${
                      errors.phone && touched.phone 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                    }`}
                    required
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Company Name
                </label>
                <input 
                  type="text" 
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  placeholder="Your Company (Optional)"
                  className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Project Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="projectType"
                  value={values.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 ${
                    errors.projectType && touched.projectType 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                  }`}
                  required
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
                {errors.projectType && touched.projectType && (
                  <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>
                )}
              </div>

              {/* Budget and Timeline - Hidden Fields */}
              {/* These fields are hidden from the form but kept in the validation schema for backend compatibility */}
              <input type="hidden" name="budget" value={values.budget} />
              <input type="hidden" name="timeline" value={values.timeline} />
              
              {/* Project Description */}
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Project Description <span className="text-red-400">*</span>
                </label>
                <textarea 
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Tell us about your project in detail..."
                  rows={5}
                  className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6 resize-none ${
                    errors.description && touched.description 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                  }`}
                  required
                />
                {errors.description && touched.description && (
                  <p className="text-red-400 text-xs mt-1">{errors.description}</p>
                )}
              </div>
              
              <Button 
                type='submit'
                disabled={isPending}
                icon={<Send size={16} />} 
                icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5/50" 
                className="text-sudo-white-1 w-full hover:bg-sudo-purple-5/20 hover:border-sudo-purple-3/50 disabled:opacity-50 disabled:cursor-not-allowed" 
                label={isPending ? "Submitting..." : "Request Free Consultation"}
                size="lg"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Custom Success Toast */}
      <SuccessToast
        open={showSuccessToast}
        onOpenChange={setShowSuccessToast}
        title="Consultation Request Submitted! 🚀"
        message="Thank you for your interest! We've received your consultation request and our team will contact you within 24 hours to schedule your free consultation. Get ready to bring your vision to life!"
        autoClose={true}
        autoCloseDelay={5000}
      />

      {/* Custom Error Toast */}
      <ErrorToast
        open={showErrorToast}
        onOpenChange={setShowErrorToast}
        title="Oops! Something went wrong 😔"
        message={errorMessage}
        autoClose={true}
        autoCloseDelay={5000}
      />
    </section>
  );
};

export default ConsultationFormSection;
