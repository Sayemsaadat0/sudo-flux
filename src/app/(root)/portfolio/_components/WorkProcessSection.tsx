'use client'
import React from 'react';
import { Search, Lightbulb, Code, Rocket, CheckCircle, Users } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const WorkProcessSection = () => {
  const processSteps = [
    {
      icon: <Search size={28} />,
      step: "01",
      title: "Discovery & Research",
      description: "We start by understanding your business goals, target audience, and project requirements through comprehensive research and stakeholder interviews.",
      features: [
        "Business Analysis",
        "User Research",
        "Competitor Analysis",
        "Technical Requirements"
      ],
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Lightbulb size={28} />,
      step: "02",
      title: "Strategy & Planning",
      description: "Based on our findings, we develop a comprehensive strategy that aligns with your business objectives and user needs.",
      features: [
        "Project Roadmap",
        "Technology Stack",
        "Timeline Planning",
        "Resource Allocation"
      ],
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    },
    {
      icon: <Code size={28} />,
      step: "03",
      title: "Design & Development",
      description: "Our team creates stunning designs and builds robust solutions using cutting-edge technologies and best practices.",
      features: [
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Quality Assurance"
      ],
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Rocket size={28} />,
      step: "04",
      title: "Launch & Deploy",
      description: "We ensure smooth deployment and launch with comprehensive testing, optimization, and performance monitoring.",
      features: [
        "Testing & QA",
        "Performance Optimization",
        "Deployment",
        "Launch Support"
      ],
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    },
    {
      icon: <CheckCircle size={28} />,
      step: "05",
      title: "Maintenance & Support",
      description: "We provide ongoing maintenance, updates, and support to ensure your digital solution continues to perform optimally.",
      features: [
        "Regular Updates",
        "Bug Fixes",
        "Performance Monitoring",
        "Technical Support"
      ],
      gradient: "from-sudo-purple-5 to-sudo-blue-5",
      color: "purple"
    },
    {
      icon: <Users size={28} />,
      step: "06",
      title: "Growth & Optimization",
      description: "We continuously analyze performance data and implement improvements to drive growth and enhance user experience.",
      features: [
        "Analytics Review",
        "Performance Optimization",
        "Feature Enhancements",
        "Growth Strategies"
      ],
      gradient: "from-sudo-blue-5 to-sudo-purple-5",
      color: "blue"
    }
  ];

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-6">Our Process</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6 text-sudo-neutral-6">
            How We Bring Your Vision to Life
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-neutral-4 text-center max-w-3xl">
            Our proven methodology ensures every project is delivered on time, within budget, and exceeds expectations. 
            We follow a systematic approach that guarantees success.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="group bg-sudo-white-2 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-sudo-white-3"
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-sudo-white-1 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-sudo-neutral-3">{step.step}</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-2 group-hover:text-sudo-purple-6 transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sudo-neutral-4 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${step.gradient} rounded-full flex-shrink-0`}></div>
                      <span className="text-sudo-neutral-5 text-sm group-hover:text-sudo-neutral-4 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-sudo-white-2 rounded-3xl p-8 max-w-2xl mx-auto border border-sudo-white-3">
            <h3 className="text-sudo-header-28 font-bold mb-4 text-sudo-neutral-6">Ready to Start Your Project?</h3>
            <p className="text-sudo-neutral-4 mb-6">
              Let&apos;s discuss your project requirements and see how our proven process can help bring your vision to life.
            </p>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-sudo-white-1 px-8 py-3 rounded-full font-semibold hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
