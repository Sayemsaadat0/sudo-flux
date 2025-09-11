'use client'
import React from 'react';
import { Phone, MapPin, Clock, ArrowRight, Calendar, DollarSign } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';
import Button from '@/components/ui/button';

const HeroSection = () => {
  const quickActions = [
    {
      icon: <Calendar size={20} />,
      title: "Book Consultation",
      description: "Free 30-min session",
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      href: "#consultation-form"
    },
    {
      icon: <Phone size={20} />,
      title: "Call Now",
      description: "+1 (555) 123-4567",
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      href: "tel:+15551234567"
    },
    {
      icon: <DollarSign size={20} />,
      title: "Get Quote",
      description: "Free estimation",
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      href: "#consultation-form"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-sudo-white-1 via-sudo-white-2 to-sudo-white-3 text-sudo-neutral-6 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced Background Elements - Different Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-sudo-purple-1/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sudo-blue-1/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-sudo-purple-2/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-sudo-blue-2/15 rounded-full blur-2xl"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-sudo-purple-6 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-sudo-blue-6 rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-sudo-purple-6 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-sudo-blue-6 rotate-12"></div>
      </div>

      <div className="sudo-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-col justify-start items-start w-fit">
                <h4 className="uppercase font-bold text-sudo-purple-6 mb-2">Why Choose Us</h4>
                <div className="w-full">
                  <LineAnimation />
                </div>
              </div>
              
              <h1 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading">
                Expert Guidance for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6">
                  Your Success
                </span>
              </h1>
              
              <p className="text-sudo-paragraph-20 text-sudo-neutral-4 leading-relaxed max-w-lg">
                Our experienced team provides strategic insights and technical expertise to help you make informed decisions about your digital projects.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <h3 className="text-sudo-header-20 font-semibold text-sudo-neutral-6">
                Our Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="group bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl p-4 hover:bg-sudo-white-2 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center text-sudo-white-1 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <h4 className="font-semibold text-sudo-neutral-6 text-sm mb-1">
                      {action.title}
                    </h4>
                    <p className="text-sudo-neutral-4 text-xs">
                      {action.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                icon={<ArrowRight size={18} />} 
                icon_style="border border-sudo-purple-6 text-sudo-purple-6 bg-sudo-white-2" 
                className="text-sudo-neutral-6 hover:bg-sudo-purple-1 hover:border-sudo-purple-6" 
                label="Learn More About Us"
                size="lg"
              />
            </div>
          </div>

          {/* Right Side - Stats & Visual */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl p-6 text-center group hover:bg-sudo-white-2 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-sudo-purple-6 mb-2 group-hover:scale-110 transition-transform duration-300">8+</div>
                <div className="text-sudo-neutral-4 text-sm font-medium">Years Experience</div>
                <div className="text-sudo-neutral-3 text-xs mt-1">Proven expertise</div>
              </div>
              <div className="bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl p-6 text-center group hover:bg-sudo-white-2 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-sudo-blue-6 mb-2 group-hover:scale-110 transition-transform duration-300">200+</div>
                <div className="text-sudo-neutral-4 text-sm font-medium">Projects Delivered</div>
                <div className="text-sudo-neutral-3 text-xs mt-1">Successful outcomes</div>
              </div>
              <div className="bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl p-6 text-center group hover:bg-sudo-white-2 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-sudo-purple-6 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-sudo-neutral-4 text-sm font-medium">Client Satisfaction</div>
                <div className="text-sudo-neutral-3 text-xs mt-1">Happy customers</div>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl hover:bg-sudo-white-2 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-neutral-6">Global Reach</h4>
                  <p className="text-sudo-neutral-4 text-sm">Serving clients worldwide</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl hover:bg-sudo-white-2 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-neutral-6">Flexible Hours</h4>
                  <p className="text-sudo-neutral-4 text-sm">Available across time zones</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-white-3 rounded-2xl p-6">
              <h4 className="text-sudo-neutral-6 font-semibold mb-3">Our Approach:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-purple-6 rounded-full"></div>
                  <span className="text-sudo-neutral-4 text-sm">Strategic planning & analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-blue-6 rounded-full"></div>
                  <span className="text-sudo-neutral-4 text-sm">Modern technology stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-purple-6 rounded-full"></div>
                  <span className="text-sudo-neutral-4 text-sm">Scalable solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-blue-6 rounded-full"></div>
                  <span className="text-sudo-neutral-4 text-sm">Ongoing support & maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
