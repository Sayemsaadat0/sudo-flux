'use client'
import React, { useEffect, useRef } from 'react';
// import Button from '@/components/ui/button';
import { Code, Palette, Smartphone, Database, Zap, Globe } from 'lucide-react';
// import LineAnimation from '@/components/animations/LineAnimation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ServicesOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: <Code size={28} />,
      title: "Web Development",
      subtitle: "Modern Web Solutions",
      description: "Custom web applications built with cutting-edge technologies and industry best practices",
      features: [
        "React & Next.js Development",
        "Node.js Backend Solutions", 
        "API Development & Integration",
        "Performance Optimization",
        "Responsive Design",
        "SEO Optimization"
      ],
      gradient: "from-sudo-purple-3 to-sudo-blue-3",
      bgGradient: "from-sudo-purple-1/20 to-sudo-blue-1/20",
      stats: "200+ Projects"
    },
    {
      icon: <Palette size={28} />,
      title: "UI/UX Design",
      subtitle: "User-Centered Design",
      description: "User-centered design solutions that enhance user experience and drive engagement",
      features: [
        "User Research & Analysis",
        "Wireframing & Prototyping",
        "Visual Design Systems",
        "Interactive Prototypes",
        "Usability Testing",
        "Design Handoff"
      ],
      gradient: "from-sudo-blue-3 to-sudo-purple-3",
      bgGradient: "from-sudo-blue-1/20 to-sudo-purple-1/20",
      stats: "150+ Designs"
    },
    {
      icon: <Smartphone size={28} />,
      title: "Mobile Development",
      subtitle: "Native & Cross-Platform",
      description: "Native and cross-platform mobile applications for iOS and Android platforms",
      features: [
        "React Native Development",
        "Native iOS/Android Apps",
        "Progressive Web Apps",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality"
      ],
      gradient: "from-sudo-purple-3 to-sudo-blue-3",
      bgGradient: "from-sudo-purple-1/20 to-sudo-blue-1/20",
      stats: "100+ Apps"
    },
    {
      icon: <Database size={28} />,
      title: "E-commerce Solutions",
      subtitle: "Complete Platforms",
      description: "Complete e-commerce platforms that drive sales and enhance customer experience",
      features: [
        "Shopify Development",
        "Custom E-commerce Platforms",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Processing",
        "Analytics & Reporting"
      ],
      gradient: "from-sudo-blue-3 to-sudo-purple-3",
      bgGradient: "from-sudo-blue-1/20 to-sudo-purple-1/20",
      stats: "80+ Stores"
    },
    {
      icon: <Zap size={28} />,
      title: "Digital Marketing",
      subtitle: "Growth Strategies",
      description: "Strategic digital marketing campaigns that increase brand visibility and conversions",
      features: [
        "SEO Optimization",
        "PPC Campaign Management",
        "Social Media Marketing",
        "Content Marketing",
        "Email Marketing",
        "Analytics & Reporting"
      ],
      gradient: "from-sudo-purple-3 to-sudo-blue-3",
      bgGradient: "from-sudo-purple-1/20 to-sudo-blue-1/20",
      stats: "300+ Campaigns"
    },
    {
      icon: <Globe size={28} />,
      title: "Cloud Solutions",
      subtitle: "Scalable Infrastructure",
      description: "Scalable cloud infrastructure and DevOps solutions for modern businesses",
      features: [
        "AWS/Azure Setup",
        "CI/CD Pipeline Development",
        "Server Management",
        "Security & Monitoring",
        "Backup & Recovery",
        "Performance Optimization"
      ],
      gradient: "from-sudo-blue-3 to-sudo-purple-3",
      bgGradient: "from-sudo-blue-1/20 to-sudo-purple-1/20",
      stats: "50+ Deployments"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize cards refs array
    cardsRef.current = cardsRef.current.slice(0, services.length);

    // Animate cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          onEnter: () => {
            gsap.to(card, {
              duration: 0.6,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'back.out(1.7)',
              delay: index * 0.1
            });
          },
          onLeave: () => {
            gsap.to(card, {
              duration: 0.4,
              y: 20,
              opacity: 0.8,
              scale: 0.98,
              ease: 'power2.out'
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              duration: 0.6,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'back.out(1.7)'
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              duration: 0.4,
              y: 20,
              opacity: 0.8,
              scale: 0.98,
              ease: 'power2.out'
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [services.length]);

  return (
    <section ref={sectionRef} className="relative bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sudo-purple-3/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sudo-blue-3/5 rounded-full blur-3xl"></div>
      </div>

      <div className="sudo-container relative z-10">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-sudo-purple-1/80 backdrop-blur-sm border border-sudo-purple-2/50 rounded-full">
                <div className="w-2 h-2 bg-sudo-purple-6 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-sudo-purple-6 uppercase tracking-wider">
                  What We Provide
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.9] tracking-tight">
                <span className="text-sudo-white-1">Comprehensive</span>
                <br />
                <span className="gradient-text-static bg-gradient-to-r from-sudo-purple-3 via-sudo-blue-3 to-sudo-purple-3 bg-clip-text text-transparent">
                  Digital Services
                </span>
              </h2>
              <p className="text-xl sm:text-2xl text-sudo-white-4 leading-relaxed max-w-3xl mx-auto font-light">
                We offer a complete suite of digital services to help your business thrive in the modern digital landscape.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative bg-sudo-neutral-5/80 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-3xl p-8 space-y-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 scale-95"
                style={{ transform: 'translateY(50px) scale(0.95)' }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Icon & Stats */}
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-sudo-white-4 font-medium">{service.stats}</div>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-bold text-sudo-white-1 group-hover:text-sudo-purple-3 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sudo-purple-3 text-sm font-semibold uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sudo-white-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 gap-3">
                    {service.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-sm text-sudo-white-4">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-sudo-purple-3 to-sudo-blue-3 rounded-full flex-shrink-0"></div>
                        <span className="group-hover:text-sudo-white-3 transition-colors duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
