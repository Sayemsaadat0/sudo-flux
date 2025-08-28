import React from 'react';
import HeroSection from './HeroSection';
import ProcessSection from './ProcessSection';
import ServicesOverview from './ServicesOverview';

const ServiceContainer = () => {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (White) */}
      <HeroSection />
      
      {/* Section 2: Services Overview (Black) */}
      <ServicesOverview />
      
      {/* Section 3: Technologies 
      
      {/* Section 4: Process (Black) */}
      <ProcessSection />
    </main>
  );
};

export default ServiceContainer;
