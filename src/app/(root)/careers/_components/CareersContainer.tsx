'use client'

import React from 'react';
import HeroSection from './HeroSection';
import CareersListSection from './CareersListSection';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"
import { useGetCareerList } from '@/hooks/careers.hooks';

const CareersContainer: React.FC = () => {
  const { data: careersResponse, isLoading, error } = useGetCareerList({ 
    status: 'open',
    per_page: 50 
  });
  const careers = careersResponse?.results || [];
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('careers-page', sessionId)


  if (isLoading) {
    return (
        <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sudo-blue-6 mx-auto mb-4"></div>
          <p className="text-sudo-neutral-4">Loading careers...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-sudo-neutral-6 mb-4">Error Loading Careers</h3>
          <p className="text-sudo-neutral-4 max-w-md mx-auto">
            There was an error loading the careers. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-3 bg-sudo-blue-6 text-white rounded-xl hover:bg-sudo-blue-7 transition-colors"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Section 1: Hero - Dark */}
      <div ref={createSectionRef('careers-hero-section')}>
        <HeroSection />
      </div>
      
      {/* Section 2: Careers List - White */}
      <div ref={createSectionRef('careers-list-section')}>
        <CareersListSection careers={careers} />
      </div>
    </main>
  );
};

export default CareersContainer;
