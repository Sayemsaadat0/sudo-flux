'use client'
import React from 'react';
import { Code, Palette, Smartphone, Database, Zap, Globe } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ServicesOverview = () => {
  const services = [
    {
      icon: <Code size={24} />,
      title: "Web Development",
      subtitle: "Modern Web Solutions",
      description: "Custom web applications built with cutting-edge technologies and industry best practices",
      features: [
        "React & Next.js Development",
        "Node.js Backend Solutions", 
        "API Development & Integration",
        "Performance Optimization"
      ],
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      bgGradient: "from-sudo-purple-1/10 to-sudo-blue-1/10",
      stats: "200+ Projects",
      color: "purple"
    },
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      subtitle: "User-Centered Design",
      description: "User-centered design solutions that enhance user experience and drive engagement",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design Systems",
        "Interactive Prototypes"
      ],
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      bgGradient: "from-sudo-blue-1/10 to-sudo-purple-1/10",
      stats: "150+ Designs",
      color: "blue"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Development",
      subtitle: "Native & Cross-Platform",
      description: "Native and cross-platform mobile applications for iOS and Android platforms",
      features: [
        "React Native Development",
        "Native iOS/Android Apps",
        "Progressive Web Apps",
        "App Store Optimization"
      ],
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      bgGradient: "from-sudo-purple-1/10 to-sudo-blue-1/10",
      stats: "100+ Apps",
      color: "purple"
    },
    {
      icon: <Database size={24} />,
      title: "E-commerce Solutions",
      subtitle: "Complete Platforms",
      description: "Complete e-commerce platforms that drive sales and enhance customer experience",
      features: [
        "Shopify Development",
        "Custom E-commerce Platforms",
        "Payment Gateway Integration",
        "Inventory Management"
      ],
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      bgGradient: "from-sudo-blue-1/10 to-sudo-purple-1/10",
      stats: "80+ Stores",
      color: "blue"
    },
    {
      icon: <Zap size={24} />,
      title: "Digital Marketing",
      subtitle: "Growth Strategies",
      description: "Strategic digital marketing campaigns that increase brand visibility and conversions",
      features: [
        "SEO Optimization",
        "PPC Campaign Management",
        "Social Media Marketing",
        "Content Marketing"
      ],
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      bgGradient: "from-sudo-purple-1/10 to-sudo-blue-1/10",
      stats: "300+ Campaigns",
      color: "purple"
    },
    {
      icon: <Globe size={24} />,
      title: "Cloud Solutions",
      subtitle: "Scalable Infrastructure",
      description: "Scalable cloud infrastructure and DevOps solutions for modern businesses",
      features: [
        "AWS/Azure Setup",
        "CI/CD Pipeline Development",
        "Server Management",
        "Security & Monitoring"
      ],
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      bgGradient: "from-sudo-blue-1/10 to-sudo-purple-1/10",
      stats: "50+ Deployments",
      color: "blue"
    }
  ];



  return (
    <section className="bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-3">Our Services</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
            We offer a complete suite of digital services to help your business thrive in the modern digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-3xl p-8 hover:bg-sudo-neutral-5/50 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center text-sudo-white-1 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div className="text-right">
                  <div className="text-sm text-sudo-white-5 font-medium">{service.stats}</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sudo-header-28 font-bold text-sudo-white-1 mb-2 group-hover:text-sudo-purple-3 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sudo-purple-3 text-sm font-semibold uppercase tracking-wider">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-sudo-white-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full flex-shrink-0`}></div>
                      <span className="text-sudo-white-6 text-sm group-hover:text-sudo-white-5 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
