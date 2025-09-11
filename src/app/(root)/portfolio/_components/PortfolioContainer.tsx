'use client'

import React from 'react';
import HeroSection from './HeroSection';
import WorkProcessSection from './WorkProcessSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from '@/components/home-page/TestimonialSection';
import ContactSection from '@/components/home-page/ContactSection';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

const PortfolioContainer = () => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('portfolio-page', sessionId)

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (Dark) */}
      <div ref={createSectionRef('portfolio-hero-section')}>
        <HeroSection />
      </div>
      
      {/* Section 2: Work Process (White) */}
      <div ref={createSectionRef('portfolio-process-section')}>
        <WorkProcessSection />
      </div>
      
             {/* Section 3: Projects (Dark) */}
       <div ref={createSectionRef('portfolio-projects-section')}>
         <ProjectsSection />
       </div>
       
       {/* Section 4: Testimonials (Dark) */}
       <div ref={createSectionRef('portfolio-testimonials-section')}>
         <TestimonialsSection />
       </div>
      
             {/* Section 5: Contact (Dark) */}
       <div ref={createSectionRef('portfolio-contact-section')}>
         <ContactSection />
       </div>
    </main>
  );
};

export default PortfolioContainer;
