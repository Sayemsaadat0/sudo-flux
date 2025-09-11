'use client'

import React from 'react';
import HeroSection from './HeroSection';
import ContactInfoSection from './ContactInfoSection';
import ContactFormSection from './ContactFormSection';
import FAQSection from './FAQSection';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

const ContactContainer = () => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('contact-page', sessionId)

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (Dark) */}
      <div ref={createSectionRef('contact-hero-section')}>
        <HeroSection />
      </div>
      
      {/* Section 2: Contact Info (White) */}
      <div ref={createSectionRef('contact-info-section')}>
        <ContactInfoSection />
      </div>
      
      {/* Section 3: Contact Form (Dark) */}
      <div ref={createSectionRef('contact-form-section')}>
        <ContactFormSection />
      </div>
      
      {/* Section 4: FAQ (White) */}
      <div ref={createSectionRef('contact-faq-section')}>
        <FAQSection />
      </div>
    </main>
  );
};

export default ContactContainer;
