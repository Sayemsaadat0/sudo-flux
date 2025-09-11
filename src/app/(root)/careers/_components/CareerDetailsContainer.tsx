'use client'

import React from 'react';
import CareerDetailsSection from './CareerDetailsSection';
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"
import { CareerResponseType } from '@/hooks/careers.hooks';

interface CareerDetailsContainerProps {
  career: CareerResponseType;
}

const CareerDetailsContainer: React.FC<CareerDetailsContainerProps> = ({ career }) => {
  const { sessionId } = useVisitorTracking()
  const { createSectionRef } = useSectionTracking('career-details-page', sessionId)

  return (
    <main className="min-h-screen">
      {/* Career Details Section */}
      <div ref={createSectionRef('career-details-section')}>
        <CareerDetailsSection career={career} />
      </div>
    </main>
  );
};

export default CareerDetailsContainer;
