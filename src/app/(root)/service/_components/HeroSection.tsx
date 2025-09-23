'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Rocket } from 'lucide-react';
// import LineAnimation from '@/components/animations/LineAnimation';
import { gsap } from 'gsap';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const highlights = [
    { text: "Custom Web Development", icon: <Zap size={16} /> },
    { text: "Mobile App Development", icon: <Rocket size={16} /> },
    { text: "UI/UX Design", icon: <Sparkles size={16} /> },
    { text: "E-commerce Solutions", icon: <Shield size={16} /> },
    { text: "Cloud Infrastructure", icon: <Zap size={16} /> },
    { text: "Digital Marketing", icon: <Rocket size={16} /> }
  ];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.fromTo(titleRef.current, 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(highlightsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sudo-white-1 via-sudo-white-2 to-sudo-white-1">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-sudo-purple-3/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sudo-blue-3/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-sudo-purple-3/3 to-sudo-blue-3/3 rounded-full blur-3xl"></div>
      </div>

      <div className="sudo-container relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-sudo-purple-1/80 backdrop-blur-sm border border-sudo-purple-2/50 rounded-full">
            <div className="w-2 h-2 bg-sudo-purple-6 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-sudo-purple-6 uppercase tracking-wider">
              Comprehensive Digital Solutions
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-10">
            {/* Title */}
            <div className="space-y-8">
              <h1 
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.9] tracking-tight"
              >
                <span className="text-sudo-neutral-6">Our</span>
                <br />
                <span className="gradient-text-static bg-gradient-to-r from-sudo-purple-3 via-sudo-blue-3 to-sudo-purple-3 bg-clip-text text-transparent">
                  Services
                </span>
                <br />
                <span className="text-sudo-neutral-6">& Solutions</span>
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-xl sm:text-2xl lg:text-3xl text-sudo-neutral-4 leading-relaxed max-w-4xl mx-auto font-light"
              >
                From concept to deployment, we provide end-to-end digital solutions that transform businesses 
                and drive growth in the digital landscape.
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/contact">
                <Button 
                  icon={<ArrowRight size={20} />} 
                  icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-white-2" 
                  className="text-sudo-neutral-6 bg-gradient-to-r from-sudo-purple-3 to-sudo-blue-3 hover:from-sudo-purple-4 hover:to-sudo-blue-4  shadow-lg hover:shadow-xl transition-all duration-300" 
                  label="Get Started Today"
                  size="lg"
                />
              </Link>
              <Link href="/portfolio">
                <Button 
                  icon={<ArrowRight size={20} />} 
                  icon_style="border border-sudo-neutral-4 text-sudo-neutral-4 bg-transparent" 
                  className="text-sudo-neutral-6 border-sudo-neutral-4 hover:bg-sudo-neutral-4 hover:text-sudo-white-1 transition-all duration-300" 
                  label="View Portfolio"
                  variant="outlineBtn"
                  size="lg"
                />
              </Link>
            </div>
          </div>

          {/* Service Highlights */}
          <div 
            ref={highlightsRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-20"
          >
            {highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="group flex items-center gap-4 p-6 bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-neutral-3/30 rounded-2xl hover:bg-sudo-white-2 hover:border-sudo-purple-3/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-sudo-purple-3 to-sudo-blue-3 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {highlight.icon}
                </div>
                <span className="text-sudo-neutral-6 font-semibold text-sm lg:text-base group-hover:text-sudo-purple-6 transition-colors duration-300">
                  {highlight.text}
                </span>
              </div>
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-32 right-20 hidden lg:block">
            <div className="flex items-center gap-3 bg-sudo-white-2/80 backdrop-blur-sm border border-sudo-neutral-3/30 rounded-full px-4 py-2 shadow-lg">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-sudo-purple-3 to-sudo-blue-3 border-2 border-sudo-white-2"></div>
                ))}
              </div>
              <span className="text-sudo-neutral-6 text-sm font-medium">500+ Projects</span>
            </div>
          </div>

         
        </div>
      </div>

     
    </section>
  );
};

export default HeroSection;
