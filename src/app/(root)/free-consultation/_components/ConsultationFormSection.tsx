'use client'
import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Send, Calendar, DollarSign, Clock3, Mail } from 'lucide-react';
import Button from '@/components/ui/button';
import LineAnimation from '@/components/animations/LineAnimation';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { useSubmitPublicConsultation } from '@/hooks/consultations.hooks';
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
  budget: Yup.string().required('Budget range is required'),
  timeline: Yup.string().required('Timeline is required'),
  description: Yup.string()
    .required('Project description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
});

const ConsultationFormSection = () => {
  const { mutateAsync: submitConsultation, isPending } = useSubmitPublicConsultation();

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
        toast.success('Consultation request submitted successfully! We\'ll contact you within 24 hours.');
        resetForm();
      } catch (error: any) {
        console.error('Error submitting consultation:', error);
        toast.error(error?.response?.data?.message || 'Failed to submit consultation request. Please try again.');
      }
    },
  });

  return (
    <section className="bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sudo-purple-3/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sudo-blue-3/5 rounded-full blur-3xl"></div>
      </div>

      <div className="sudo-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-3">Free Consultation</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6">
            Get Your Free Project Consultation
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
            Tell us about your project and we&apos;ll provide you with a detailed consultation and proposal within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Consultation Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-sudo-header-28 font-bold text-sudo-white-1">
                Let&apos;s Discuss Your Project
              </h3>
              <p className="text-sudo-paragraph-20 text-sudo-white-6 leading-relaxed">
                Our expert team will analyze your requirements and provide you with a comprehensive consultation including project scope, timeline, and budget estimation.
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
                  <p className="text-sudo-white-6">Detailed project discussion and planning</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <DollarSign size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Budget Estimation</h4>
                  <p className="text-sudo-white-6">Transparent pricing and cost breakdown</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <Clock3 size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Timeline Planning</h4>
                  <p className="text-sudo-white-6">Realistic project milestones and delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">24-Hour Response</h4>
                  <p className="text-sudo-white-6">Quick turnaround on all inquiries</p>
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
                Request Free Consultation
              </h3>
              <p className="text-sudo-white-6 text-sm">
                Fill out the form below and we&apos;ll get back to you within 24 hours with a detailed consultation.
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

              {/* Budget and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Budget Range <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="budget"
                    value={values.budget}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 ${
                      errors.budget && touched.budget 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                    }`}
                    required
                  >
                    <option value="">Select Budget</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                  {errors.budget && touched.budget && (
                    <p className="text-red-400 text-xs mt-1">{errors.budget}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Timeline <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="timeline"
                    value={values.timeline}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 ${
                      errors.timeline && touched.timeline 
                        ? 'border-red-400 focus:border-red-400' 
                        : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                    }`}
                    required
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 Month</option>
                    <option value="2-3-months">2-3 Months</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-months-plus">6+ Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                  {errors.timeline && touched.timeline && (
                    <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>
                  )}
                </div>
              </div>
              
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
    </section>
  );
};

export default ConsultationFormSection;
