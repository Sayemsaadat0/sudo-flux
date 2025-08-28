import React from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, Building, Zap, Users, Globe, TrendingUp, Shield, Heart } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const IndustriesSection = () => {
  const industries = [
    {
      icon: <Building size={32} />,
      title: "Real Estate",
      description: "Digital solutions for property management, virtual tours, and real estate platforms",
      projects: "25+ Projects",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <Zap size={32} />,
      title: "Energy & Utilities",
      description: "Smart grid technologies, energy management systems, and IoT solutions",
      projects: "18+ Projects",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Users size={32} />,
      title: "Human Resources",
      description: "HR management platforms, recruitment systems, and employee engagement tools",
      projects: "32+ Projects",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Globe size={32} />,
      title: "Global Trade",
      description: "Supply chain management, international commerce, and logistics solutions",
      projects: "28+ Projects",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Financial Services",
      description: "Banking applications, fintech solutions, and financial management platforms",
      projects: "45+ Projects",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: <Shield size={32} />,
      title: "Cybersecurity",
      description: "Security platforms, threat detection, and compliance management systems",
      projects: "22+ Projects",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: <Heart size={32} />,
      title: "Healthcare",
      description: "Medical platforms, patient management, and telemedicine solutions",
      projects: "35+ Projects",
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      icon: <Building size={32} />,
      title: "Manufacturing",
      description: "Industry 4.0 solutions, automation platforms, and production management",
      projects: "30+ Projects",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div>
                <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-purple-6">
                  Industries We Serve
                </h4>
                <div className="w-[100px] mx-auto">
                  <LineAnimation />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight text-sudo-neutral-6">
              Transforming
              <span className="gradient-text-static block">Every Industry</span>
            </h2>
            <p className="text-sudo-paragraph-20 text-sudo-neutral-4 leading-relaxed max-w-2xl mx-auto">
              We&apos;ve successfully delivered digital solutions across diverse industries, 
              helping businesses innovate and grow in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-sudo-white-2 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`${industry.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {industry.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-sudo-neutral-6">
                    {industry.title}
                  </h3>
                  <p className="text-sudo-neutral-4 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xs font-medium text-sudo-purple-6 uppercase tracking-wider">
                      {industry.projects}
                    </span>
                    <div className="w-8 h-8 bg-sudo-purple-1 rounded-full flex items-center justify-center group-hover:bg-sudo-purple-2 transition-colors">
                      <ArrowRight size={16} className="text-sudo-purple-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button 
              icon={<ArrowRight size={16} />} 
              icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-white-2" 
              className="text-sudo-neutral-6 w-fit" 
              label="Explore All Industries"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
