// src/components/sections/IndustryWeServe.tsx
import React from 'react';
import Link from 'next/link';
import VerticalScroller from '@/components/animations/VerticalScroller'; // Adjust path if needed
import IndustryCard from '@/components/core/cards/IndustryCard';
import { ArrowRight, Building, Zap, Users, Globe, TrendingUp, Shield } from 'lucide-react';

import LineAnimation from '../animations/LineAnimation';
import Button from '../ui/button';



// --- Data for the Cards ---
const industries = [
  {
    icon: <Building className="h-6 w-6" />,
    title: "Real Estate",
    description: "Transform property management with intelligent automation, predictive analytics, and seamless tenant experiences that drive growth.",
    href: "/industries/real-estate",
    gradient: "from-emerald-500 to-teal-600",
    stats: "200+ Properties"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Energy & Utilities",
    description: "Optimize energy distribution, reduce costs, and enhance sustainability with smart grid technologies and IoT solutions.",
    href: "/industries/energy",
    gradient: "from-yellow-500 to-orange-600",
    stats: "150+ Plants"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Human Resources",
    description: "Revolutionize talent acquisition and employee engagement with AI-powered recruitment and performance analytics.",
    href: "/industries/hr",
    gradient: "from-purple-500 to-pink-600",
    stats: "500+ Companies"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Trade",
    description: "Streamline international commerce with blockchain-based supply chain tracking and automated compliance solutions.",
    href: "/industries/trade",
    gradient: "from-blue-500 to-indigo-600",
    stats: "300+ Partners"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Financial Services",
    description: "Enhance security and efficiency with advanced fraud detection, robo-advisory services, and digital banking solutions.",
    href: "/industries/finance",
    gradient: "from-green-500 to-emerald-600",
    stats: "400+ Institutions"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Cybersecurity",
    description: "Protect digital assets with next-generation threat detection, zero-trust architecture, and automated incident response.",
    href: "/industries/security",
    gradient: "from-red-500 to-rose-600",
    stats: "800+ Networks"
  }
];

// Your business deserves to be seen, understood, and remembered
const IndustryWeServe = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-4">
            <div >
              <h4 className="uppercase font-bold text-sm sm:text-base">What We Build</h4>
              <div className="w-[100px]">
                <LineAnimation />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-title-48 md:leading-[60px] text-sudo-neutral-6 font-heading leading-tight">
              Your business deserves to be seen, understood, and remembered
            </h2>
            <p className='text-sm sm:text-base lg:text-sudo-paragraph-20 leading-relaxed'>
              We dig deeper than most, because we know your digital presence should reflect what sets you apart in your field.
            </p>
            <Link href={'/quote'}>
              <Button 
                icon={<ArrowRight size={'16'} className="sm:w-[18px] sm:h-[18px]" />} 
                icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100" 
                className="text-sudo-white-2 w-fit" 
                label="Contact Us"
                size="md"
              />
            </Link>
          </div>

          {/* Cards Container - Different layouts for different screen sizes */}
          <div className="relative w-full">
            {/* Simple Grid Layout for Small and Medium Devices */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {industries.map((industry, index) => (
                  <IndustryCard key={index} {...industry} />
                ))}
              </div>
            </div>

            {/* Vertical Scroller for Large Devices */}
            <div className="hidden lg:block relative h-[600px] w-full">
              <VerticalScroller duration={10} pauseOnHover>
                <div className="p-4 space-y-4">
                  {/* Map over your data to create the cards */}
                  {industries.map((industry, index) => (
                    <IndustryCard key={index} {...industry} />
                  ))}
                </div>
              </VerticalScroller>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryWeServe;