import React from 'react';
import HeroSection from './HeroSection';
import WorkProcessSection from './WorkProcessSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from '@/components/home-page/TestimonialSection';
import ContactSection from '@/components/home-page/ContactSection';

const PortfolioContainer = () => {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (Dark) */}
      <HeroSection />
      
      {/* Section 2: Work Process (White) */}
      <WorkProcessSection />
      
             {/* Section 3: Projects (Dark) */}
       <ProjectsSection />
       
       {/* Section 4: Testimonials (Dark) */}
       <TestimonialsSection />
      
             {/* Section 5: Contact (Dark) */}
       <ContactSection />
    </main>
  );
};

export default PortfolioContainer;
