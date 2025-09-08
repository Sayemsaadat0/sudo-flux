import React from 'react';
import HeroSection from './HeroSection';
import ConsultationInfoSection from './ConsultationInfoSection';
import ConsultationFormSection from './ConsultationFormSection';
import FAQSection from './FAQSection';

const FreeConsultationContainer = () => {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (Dark) */}
      <HeroSection />
      
      {/* Section 2: Consultation Info (White) */}
      <ConsultationInfoSection />
      
      {/* Section 3: Consultation Form (Dark) */}
      <ConsultationFormSection />
      
      {/* Section 4: FAQ (White) */}
      <FAQSection />
    </main>
  );
};

export default FreeConsultationContainer;
