'use client'

import React from 'react';
import HeroSection from './HeroSection';
import ConsultationInfoSection from './ConsultationInfoSection';
import ConsultationFormSection from './ConsultationFormSection';
import FAQSection from './FAQSection';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

const FreeConsultationContainer = () => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('free-consultation-page', sessionId)

  return (
    <main className="min-h-screen">
      {/* Section 1: Consultation Form (Dark) - MOVED TO TOP */}
      <div ref={createSectionRef('consultation-form-section')}>
        <ConsultationFormSection />
      </div>
      
      {/* Section 2: Hero (White) - NEW DESIGN */}
      <div ref={createSectionRef('consultation-hero-section')}>
        <HeroSection />
      </div>
      
      {/* Section 3: Consultation Info (Dark) - NEW DESIGN */}
      <div ref={createSectionRef('consultation-info-section')}>
        <ConsultationInfoSection />
      </div>
      
      {/* Section 4: FAQ (White) */}
      <div ref={createSectionRef('consultation-faq-section')}>
        <FAQSection />
      </div>
    </main>
  );
};

export default FreeConsultationContainer;
