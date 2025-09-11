'use client'
import React from 'react';
import { Briefcase, Users, MapPin, Clock, ArrowRight } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';
import Button from '@/components/ui/button';

const HeroSection = () => {
  const quickStats = [
    {
      icon: <Briefcase size={20} />,
      title: "Open Positions",
      value: "12+",
      description: "Available roles",
      gradient: "from-sudo-purple-5 to-sudo-blue-5"
    },
    {
      icon: <Users size={20} />,
      title: "Team Members",
      value: "50+",
      description: "Talented professionals",
      gradient: "from-sudo-blue-5 to-sudo-purple-5"
    },
    {
      icon: <MapPin size={20} />,
      title: "Locations",
      value: "3",
      description: "Global offices",
      gradient: "from-sudo-purple-5 to-sudo-blue-5"
    }
  ];

  return (
    <section className="bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-col justify-start items-start w-fit">
                <h4 className="uppercase font-bold text-sudo-purple-3 mb-2">Join Our Team</h4>
                <div className="w-full">
                  <LineAnimation />
                </div>
              </div>
              
              <h1 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading">
                Build Your Career
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sudo-purple-3 to-sudo-blue-3">
                  With Us
                </span>
              </h1>
              
              <p className="text-sudo-paragraph-20 text-sudo-white-6 leading-relaxed max-w-lg">
                Join our innovative team and work on cutting-edge projects that make a real impact. We offer competitive benefits, flexible work arrangements, and endless growth opportunities.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-sudo-header-20 font-semibold text-sudo-white-1">
                Why Work With Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="group bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl p-4 hover:bg-sudo-neutral-5/50 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-sudo-white-1 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <h4 className="font-semibold text-sudo-white-1 text-sm mb-1">
                      {stat.title}
                    </h4>
                    <p className="text-sudo-white-6 text-xs">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                icon={<ArrowRight size={18} />} 
                icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5/50" 
                className="text-sudo-white-1 hover:bg-sudo-purple-5/20 hover:border-sudo-purple-3/50" 
                label="View Open Positions"
                size="lg"
              />
            </div>
          </div>

          {/* Right Side - Benefits & Culture */}
          <div className="space-y-8">
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl p-6 text-center group hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="text-4xl font-bold text-sudo-purple-3 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sudo-white-6 text-sm font-medium">Remote Friendly</div>
                <div className="text-sudo-white-4 text-xs mt-1">Work from anywhere</div>
              </div>
              <div className="bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl p-6 text-center group hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="text-4xl font-bold text-sudo-blue-3 mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
                <div className="text-sudo-white-6 text-sm font-medium">Paid Days Off</div>
                <div className="text-sudo-white-4 text-xs mt-1">Plus holidays</div>
              </div>
              <div className="bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl p-6 text-center group hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="text-4xl font-bold text-sudo-purple-3 mb-2 group-hover:scale-110 transition-transform duration-300">$5K</div>
                <div className="text-sudo-white-6 text-sm font-medium">Learning Budget</div>
                <div className="text-sudo-white-4 text-xs mt-1">Annual allowance</div>
              </div>
            </div>

            {/* Culture Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Inclusive Culture</h4>
                  <p className="text-sudo-white-6 text-sm">Diverse and welcoming environment</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-2xl hover:bg-sudo-neutral-5/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-sudo-blue-5 to-sudo-purple-5 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-sudo-white-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-white-1">Flexible Hours</h4>
                  <p className="text-sudo-white-6 text-sm">Work-life balance matters</p>
                </div>
              </div>
            </div>

            {/* Company Values */}
            <div className="bg-sudo-neutral-5/20 backdrop-blur-sm border border-sudo-neutral-4/10 rounded-2xl p-6">
              <h4 className="text-sudo-white-1 font-semibold mb-3">Our Values:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-purple-3 rounded-full"></div>
                  <span className="text-sudo-white-6 text-sm">Innovation and creativity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-blue-3 rounded-full"></div>
                  <span className="text-sudo-white-6 text-sm">Collaboration and teamwork</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-purple-3 rounded-full"></div>
                  <span className="text-sudo-white-6 text-sm">Continuous learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sudo-blue-3 rounded-full"></div>
                  <span className="text-sudo-white-6 text-sm">Customer success focus</span>
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
