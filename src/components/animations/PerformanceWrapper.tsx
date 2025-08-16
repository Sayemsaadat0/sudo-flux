'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { isMobile, prefersReducedMotion } from '@/lib/utils';

interface PerformanceContextType {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isMobile: false,
  prefersReducedMotion: false,
  shouldReduceAnimations: false,
});

export const usePerformance = () => useContext(PerformanceContext);

interface PerformanceWrapperProps {
  children: React.ReactNode;
  disableAnimationsOnMobile?: boolean;
  disableAnimationsOnReducedMotion?: boolean;
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({
  children,
  disableAnimationsOnMobile = true,
  disableAnimationsOnReducedMotion = true,
}) => {
  const [performanceState, setPerformanceState] = useState<PerformanceContextType>({
    isMobile: false,
    prefersReducedMotion: false,
    shouldReduceAnimations: false,
  });

  useEffect(() => {
    const checkPerformance = () => {
      const mobile = isMobile();
      const reducedMotion = prefersReducedMotion();
      
      const shouldReduce = 
        (mobile && disableAnimationsOnMobile) || 
        (reducedMotion && disableAnimationsOnReducedMotion);

      setPerformanceState({
        isMobile: mobile,
        prefersReducedMotion: reducedMotion,
        shouldReduceAnimations: shouldReduce,
      });
    };

    // Initial check
    checkPerformance();

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkPerformance();
    
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', checkPerformance);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkPerformance);
    };
  }, [disableAnimationsOnMobile, disableAnimationsOnReducedMotion]);

  return (
    <PerformanceContext.Provider value={performanceState}>
      {children}
    </PerformanceContext.Provider>
  );
};

export default PerformanceWrapper;
