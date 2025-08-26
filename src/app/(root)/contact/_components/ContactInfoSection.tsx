'use client'
import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Video, Users, Globe } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ContactInfoSection = () => {
  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "hello@sudoflux.com",
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      description: "Come see our office",
      contact: "San Francisco, CA",
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      description: "When we're available",
      contact: "Mon-Fri: 9AM-6PM PST",
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle size={24} />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      gradient: "from-sudo-purple-5 to-sudo-blue-5"
    },
    {
      icon: <Video size={24} />,
      title: "Video Call",
      description: "Schedule a face-to-face meeting",
      gradient: "from-sudo-blue-5 to-sudo-purple-5"
    },
    {
      icon: <Users size={24} />,
      title: "Team Meeting",
      description: "Meet with our entire project team",
      gradient: "from-sudo-purple-5 to-sudo-blue-5"
    },
    {
      icon: <Globe size={24} />,
      title: "Remote Support",
      description: "We work with clients worldwide",
      gradient: "from-sudo-blue-5 to-sudo-purple-5"
    }
  ];

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-6">Contact Information</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6 text-sudo-neutral-6">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-neutral-4 text-center max-w-3xl">
            Choose the most convenient way to get in touch. We&apos;re here to help you with any questions or project inquiries.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="group bg-sudo-white-2 rounded-3xl p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-sudo-white-3"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center text-sudo-white-1 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {method.icon}
              </div>
              <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-2">
                {method.title}
              </h3>
              <p className="text-sudo-neutral-4 text-sm mb-3">
                {method.description}
              </p>
              <p className="text-sudo-purple-6 font-semibold">
                {method.contact}
              </p>
            </div>
          ))}
        </div>

        {/* Support Options */}
        <div className="text-center mb-12">
          <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-4">
            Additional Support Options
          </h3>
          <p className="text-sudo-neutral-4 max-w-2xl mx-auto">
            We offer various ways to connect and collaborate with our team to ensure you get the support you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((option, index) => (
            <div 
              key={index}
              className="group bg-sudo-white-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-sudo-white-3"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${option.gradient} rounded-xl flex items-center justify-center text-sudo-white-1 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {option.icon}
              </div>
              <h4 className="text-sudo-header-20 font-bold text-sudo-neutral-6 mb-2">
                {option.title}
              </h4>
              <p className="text-sudo-neutral-4 text-sm">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
