'use client'

import React from 'react'
import { useFormik } from 'formik'
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import Button from '../ui/button'
import LineAnimation from '../animations/LineAnimation'
import { useSubmitPublicContact } from '@/hooks/publicContact.hooks'
import { SuccessToast, ErrorToast } from '@/components/ui/custom-toast'
import * as Yup from 'yup'

// Validation schema for the contact form
const ContactFormValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  subject: Yup.string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  description: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
})

export default function ContactSection() {
  const { mutateAsync: submitContact, isPending } = useSubmitPublicContact()
  const [showSuccessToast, setShowSuccessToast] = React.useState(false)
  const [showErrorToast, setShowErrorToast] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

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
      subject: '',
      description: '',
    },
    validationSchema: ContactFormValidation,
    onSubmit: async (data) => {
      try {
        await submitContact(data)
        setShowSuccessToast(true)
        resetForm()
      } catch (error: any) {
        console.error('Error submitting contact:', error)
        setErrorMessage(error?.response?.data?.message || 'Failed to send message. Please try again.')
        setShowErrorToast(true)
      }
    },
  })

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
            <h4 className="uppercase font-bold text-sudo-purple-3">Get In Touch</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
            Let&apos;s discuss how we can help you achieve your digital goals. Our team is ready to bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
                             <h3 className="text-sudo-header-28 font-bold text-sudo-white-1">
                 Let&apos;s Build Something Amazing Together
               </h3>
              <p className="text-sudo-paragraph-20 text-sudo-white-6 leading-relaxed">
                Ready to bring your vision to life? We create digital experiences that drive results and exceed expectations.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Email Us</h4>
                  <p className="text-sudo-white-6">hello@sudoflux.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <Phone size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Call Us</h4>
                  <p className="text-sudo-white-6">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Visit Us</h4>
                  <p className="text-sudo-white-6">San Francisco, CA</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Business Hours</h4>
                  <p className="text-sudo-white-6">Mon-Fri: 9AM-6PM PST</p>
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
                Get a Free Quote
              </h3>
              <p className="text-sudo-white-6 text-sm">
                Tell us about your project and we&apos;ll get back to you within 24 hours.
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
              
              {/* Email Field */}
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

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={`w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6 ${
                    errors.subject && touched.subject 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-sudo-neutral-4/30 focus:border-sudo-purple-3'
                  }`}
                  required
                />
                {errors.subject && touched.subject && (
                  <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                )}
              </div>
              
              {/* Message Field */}
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Project Details <span className="text-red-400">*</span>
                </label>
                <textarea 
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
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
                label={isPending ? "Sending..." : "Send Message"}
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
         title="Message Sent Successfully! 🎉"
         message="Thank you for reaching out! We've received your message and will get back to you within 24-48 hours. We appreciate your interest in working with us!"
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
   )
}