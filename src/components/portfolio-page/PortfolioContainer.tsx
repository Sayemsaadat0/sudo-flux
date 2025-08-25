import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ProjectsSection from './ProjectsSection';
import IndustriesSection from './IndustriesSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

const PortfolioContainer = () => {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (Dark) */}
      <HeroSection />
      
      {/* Section 2: Services (White) */}
      <ServicesSection />
      
      {/* Section 3: Projects (Dark) */}
      <ProjectsSection />
      
      {/* Section 4: Industries (White) */}
      <IndustriesSection />
      
      {/* Section 5: Testimonials (Dark) */}
      <TestimonialsSection />
      
      {/* Section 6: Contact (White) */}
      <ContactSection />
    </main>
  );
};

export default PortfolioContainer;
