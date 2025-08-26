'use client'
import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Button from '@/components/ui/button';
import LineAnimation from '@/components/animations/LineAnimation';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            <h4 className="uppercase font-bold text-sudo-purple-3">Send Message</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6">
            Get a Free Quote
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a detailed proposal.
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
                Send Us a Message
              </h3>
              <p className="text-sudo-white-6 text-sm">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Company Name
                </label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Subject
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-sudo-white-5 mb-2 tracking-wide uppercase">
                  Message
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full px-4 py-3 bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-xl focus:outline-none focus:border-sudo-purple-3 focus:bg-sudo-neutral-5/70 transition-all duration-300 text-sudo-white-1 placeholder-sudo-white-6 resize-none"
                  required
                />
              </div>
              
              <Button 
                type='submit'
                icon={<Send size={16} />} 
                icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5/50" 
                className="text-sudo-white-1 w-full hover:bg-sudo-purple-5/20 hover:border-sudo-purple-3/50" 
                label="Send Message"
                size="lg"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
