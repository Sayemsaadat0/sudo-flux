'use client'

import React from 'react';
import HeroSection from './HeroSection';
import ProcessSection from './ProcessSection';
import ServicesOverview from './ServicesOverview';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

const ServiceContainer = () => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('service-page', sessionId)

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (White) */}
      <div ref={createSectionRef('service-hero-section')}>
        <HeroSection />
      </div>
      
      {/* Section 2: Services Overview (Black) */}
      <div ref={createSectionRef('service-overview-section')}>
        <ServicesOverview />
      </div>
      
      {/* Section 3: Technologies 
      
      {/* Section 4: Process (Black) */}
      <div ref={createSectionRef('service-process-section')}>
        <ProcessSection />
      </div>
    </main>
  );
};

export default ServiceContainer;
