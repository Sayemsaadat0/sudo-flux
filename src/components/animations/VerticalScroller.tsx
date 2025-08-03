// src/components/VerticalScroller.tsx
'use client';

import React, { useRef, useEffect, ReactNode, useMemo } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';

// --- Types for Props ---
type FadeSide = 'top' | 'bottom';

interface VerticalScrollerProps {
  /** The cards or elements to be animated */
  children: ReactNode;
  /** Direction of the scroll */
  direction?: 'top' | 'bottom';
  /** Duration of one full scroll cycle in seconds */
  duration?: number;
  /** Custom classes for the main container */
  className?: string;
  /** Array of sides to apply the fade effect to. Defaults to both. */
  fadeSides?: FadeSide[];
  /** The size of the fade effect, e.g., '50px' or '15%' */
  fadeSize?: string;
}

// --- Helper function to generate the CSS mask style ---
const generateMaskStyle = (
  sides: FadeSide[],
  size: string
): React.CSSProperties => {
  if (sides.length === 0 || !size) return {};

  let gradient = 'linear-gradient(to bottom, ';
  const hasTop = sides.includes('top');
  const hasBottom = sides.includes('bottom');

  if (hasTop && hasBottom) {
    // Fades at both top and bottom
    gradient += `transparent 0%, black ${size}, black calc(100% - ${size}), transparent 100%`;
  } else if (hasTop) {
    // Fades only at the top
    gradient += `transparent 0%, black ${size}, black 100%`;
  } else if (hasBottom) {
    // Fades only at the bottom
    gradient += `black 0%, black calc(100% - ${size}), transparent 100%`;
  } else {
    // No valid sides, no mask
    return {};
  }

  gradient += ')';
  
  return {
    maskImage: gradient,
    WebkitMaskImage: gradient, // For Safari and older Chrome/Edge
  };
};

// --- The Main Component ---
const VerticalScroller: React.FC<VerticalScrollerProps> = ({
  children,
  direction = 'top',
  duration = 40,
  className,
  fadeSides = ['top', 'bottom'], // Default to fading both sides
  fadeSize = '15%', // Default to a 15% fade size
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // The core GSAP animation logic remains unchanged
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const contentHeight = content.offsetHeight / 2;
    if (direction === 'bottom') {
      gsap.set(content, { y: -contentHeight });
    }

    const distanceToMove = direction === 'top' ? -contentHeight : contentHeight;

    const tween = gsap.to(content, {
      y: `+=${distanceToMove}`,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: (y) => (parseFloat(y) % contentHeight) + 'px',
      },
    });

    return () => {
      tween.kill();
    };
  }, [children, direction, duration]);

  // Memoize the mask style object to prevent re-calculation on every render
  const maskStyle = useMemo(() => 
    generateMaskStyle(fadeSides, fadeSize),
  [fadeSides, fadeSize]);

  return (
    // The mask style is applied here
    <div
      ref={scrollerRef}
      className={clsx('relative w-full h-full overflow-hidden', className)}
      style={maskStyle}
    >
      <div ref={contentRef} className="w-full">
        {/* Render children twice for a seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
};

export default VerticalScroller;