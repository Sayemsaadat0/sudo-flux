'use client'
import React, { useEffect, useRef } from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, Search, Palette, Code, Rocket, CheckCircle, ArrowDown } from 'lucide-react';
// import LineAnimation from '@/components/animations/LineAnimation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    if (!line) return;

    // Create the animated line
    gsap.set(line, {
      background: 'linear-gradient(to bottom, #6366f1, #3b82f6, #6366f1)',
      backgroundSize: '100% 200%',
      backgroundPosition: '0% 0%'
    });

    // ScrollTrigger animation for the line
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(line, {
          backgroundPosition: `0% ${progress * 100}%`
        });
      },
      onEnter: () => {
        gsap.to(line, {
          duration: 0.5,
          opacity: 1,
          ease: 'power2.out'
        });
      },
      onLeave: () => {
        gsap.to(line, {
          duration: 0.5,
          opacity: 0.3,
          ease: 'power2.out'
        });
      },
      onEnterBack: () => {
        gsap.to(line, {
          duration: 0.5,
          opacity: 1,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(line, {
          duration: 0.5,
          opacity: 0.3,
          ease: 'power2.out'
        });
      }
    });

    // Animate step circles on scroll
    const circles = document.querySelectorAll('.step-circle');
    circles.forEach((circle) => {
      ScrollTrigger.create({
        trigger: circle,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.to(circle, {
            duration: 0.6,
            scale: 1.1,
            borderColor: '#6366f1',
            ease: 'back.out(1.7)'
          });
        },
        onLeave: () => {
          gsap.to(circle, {
            duration: 0.4,
            scale: 1,
            borderColor: '#374151',
            ease: 'power2.out'
          });
        },
        onEnterBack: () => {
          gsap.to(circle, {
            duration: 0.6,
            scale: 1.1,
            borderColor: '#6366f1',
            ease: 'back.out(1.7)'
          });
        },
        onLeaveBack: () => {
          gsap.to(circle, {
            duration: 0.4,
            scale: 1,
            borderColor: '#374151',
            ease: 'power2.out'
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const processSteps = [
    {
      icon: <Search size={28} />,
      title: "Discovery & Research",
      subtitle: "Understanding Your Needs",
      description: "We start by understanding your business goals, target audience, and project requirements through comprehensive research and analysis.",
      details: [
        "Business Analysis",
        "User Research",
        "Competitor Analysis",
        "Technical Requirements",
        "Project Scope Definition"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100"
    },
    {
      icon: <Palette size={28} />,
      title: "Design & Planning",
      subtitle: "Creating Your Vision",
      description: "Our design team creates user-centered designs and detailed project plans that align with your business objectives.",
      details: [
        "Wireframing & Prototyping",
        "UI/UX Design",
        "Information Architecture",
        "Design System Creation",
        "User Testing"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100"
    },
    {
      icon: <Code size={28} />,
      title: "Development & Testing",
      subtitle: "Building Your Solution",
      description: "Our development team builds your solution using modern technologies and best practices, with continuous testing throughout the process.",
      details: [
        "Frontend Development",
        "Backend Development",
        "API Integration",
        "Quality Assurance",
        "Performance Optimization"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100"
    },
    {
      icon: <Rocket size={28} />,
      title: "Deployment & Launch",
      subtitle: "Going Live",
      description: "We deploy your solution to production with proper monitoring, security measures, and ongoing support to ensure success.",
      details: [
        "Production Deployment",
        "Security Implementation",
        "Performance Monitoring",
        "User Training",
        "Launch Support"
      ],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 py-20 sm:py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="sudo-container relative z-10">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm border border-blue-200/50 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                  Our Process
                </span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading leading-tight">
              <span className="text-gray-800">How We</span>
              <span className="gradient-text-static bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">Work</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              Our proven development process ensures successful project delivery with transparency, 
              quality, and client satisfaction at every step.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div 
              ref={lineRef}
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 transform -translate-x-1/2 opacity-60"
            ></div>
            
            <div className="space-y-16 lg:space-y-24">
              {processSteps.map((step, index) => (
                <div key={index} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Step Circle */}
                  <div className="relative z-10">
                    <div className={`step-circle w-20 h-20 rounded-full border-4 border-gray-300 flex items-center justify-center ${step.iconBg} transition-all duration-300`}>
                      <div className={step.color}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                
                  {/* Content Card */}
                  <div className={`flex-1 max-w-2xl ${index % 2 === 1 ? '' : ''}`}>
                    <div className={`${step.bgColor} rounded-3xl p-8 space-y-6 hover:shadow-xl transition-all duration-300 border ${step.borderColor} hover:scale-105`}>
                      
                      {/* Header */}
                      <div className={`${index % 2 === 1 ? '' : ''}`}>
                        <h3 className="text-xl font-heading font-bold text-gray-800">
                          {step.title}
                        </h3>
                        <p className={`${step.color} text-sm font-medium`}>
                          {step.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-3">
                            <CheckCircle size={16} className={`${step.color} flex-shrink-0`} />
                            <span className="text-gray-600 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center w-full py-4">
                      <ArrowDown size={24} className="text-blue-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          {/* CTA Section */}
          <div className="text-center pt-16">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 space-y-6 border border-blue-200/50">
              <h3 className="text-2xl font-heading font-bold text-gray-800">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Let&apos;s discuss your project requirements and get started on creating something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  icon={<ArrowRight size={18} />} 
                  icon_style="border border-blue-600 text-blue-600 bg-white" 
                  className="text-gray-800 w-fit" 
                  label="Get Started Today"
                  size="lg"
                />
                <Button 
                  icon={<ArrowRight size={18} />} 
                  icon_style="border border-gray-400 text-gray-600 bg-transparent" 
                  className="text-gray-700 w-fit" 
                  label="Schedule a Call"
                  variant="outlineBtn"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
