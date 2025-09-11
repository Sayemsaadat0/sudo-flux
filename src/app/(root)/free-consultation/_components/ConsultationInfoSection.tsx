'use client'
import React from 'react';
import { Phone, Clock, Video, Globe, Calendar, DollarSign, Clock3, CheckCircle } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ConsultationInfoSection = () => {
  const consultationMethods = [
    {
      icon: <Calendar size={24} />,
      title: "Schedule Consultation",
      description: "Book a free 30-minute session",
      contact: "Book Now",
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567",
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    },
    {
      icon: <Video size={24} />,
      title: "Video Call",
      description: "Face-to-face consultation",
      contact: "Schedule Video Call",
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Clock size={24} />,
      title: "Quick Response",
      description: "Get answers within 24 hours",
      contact: "24h Response Time",
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    }
  ];

  const consultationBenefits = [
    {
      icon: <DollarSign size={24} />,
      title: "Free Estimation",
      description: "Get detailed budget breakdown for your project",
      gradient: "from-sudo-purple-5 to-sudo-blue-5"
    },
    {
      icon: <Clock3 size={24} />,
      title: "Timeline Planning",
      description: "Realistic project milestones and delivery schedule",
      gradient: "from-sudo-blue-5 to-sudo-purple-5"
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Expert Advice",
      description: "Professional recommendations and best practices",
      gradient: "from-sudo-purple-5 to-sudo-blue-5"
    },
    {
      icon: <Globe size={24} />,
      title: "Technology Stack",
      description: "Recommended tools and technologies for your project",
      gradient: "from-sudo-blue-5 to-sudo-purple-5"
    }
  ];

  return (
    <section className="bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sudo-purple-3/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sudo-blue-3/5 rounded-full blur-3xl"></div>
      </div>

      <div className="sudo-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-3">Our Process</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6 text-sudo-white-1">
            From Concept to Launch
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
            We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds your expectations.
          </p>
        </div>

        {/* Development Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {consultationMethods.map((method, index) => (
            <div 
              key={index}
              className="group bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-3xl p-6 hover:bg-sudo-neutral-5/50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center text-sudo-white-1 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {method.icon}
              </div>
              <h3 className="text-sudo-header-28 font-bold text-sudo-white-1 mb-2">
                {method.title}
              </h3>
              <p className="text-sudo-white-6 text-sm mb-3">
                {method.description}
              </p>
              <p className="text-sudo-purple-3 font-semibold">
                {method.contact}
              </p>
            </div>
          ))}
        </div>

        {/* Technology & Services */}
        <div className="text-center mb-12">
          <h3 className="text-sudo-header-28 font-bold text-sudo-white-1 mb-4">
            Our Technology Stack & Services
          </h3>
          <p className="text-sudo-white-6 max-w-2xl mx-auto">
            We leverage cutting-edge technologies and proven methodologies to deliver exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {consultationBenefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl p-6 hover:bg-sudo-neutral-5/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center text-sudo-white-1 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h4 className="text-sudo-header-20 font-bold text-sudo-white-1 mb-2">
                {benefit.title}
              </h4>
              <p className="text-sudo-white-6 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationInfoSection;
