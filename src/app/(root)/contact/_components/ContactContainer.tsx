import React from 'react';
import HeroSection from './HeroSection';
import ContactInfoSection from './ContactInfoSection';
import ContactFormSection from './ContactFormSection';
import FAQSection from './FAQSection';

const ContactContainer = () => {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero (Dark) */}
      <HeroSection />
      
      {/* Section 2: Contact Info (White) */}
      <ContactInfoSection />
      
      {/* Section 3: Contact Form (Dark) */}
      <ContactFormSection />
      
      {/* Section 4: FAQ (White) */}
      <FAQSection />
    </main>
  );
};

export default ContactContainer;
