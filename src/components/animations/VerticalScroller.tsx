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
  /** Pauses the animation when the mouse is over the scroller. Defaults to false. */
  pauseOnHover?: boolean;
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
  pauseOnHover = false,
  className,
  fadeSides = ['top', 'bottom'], // Default to fading both sides
  fadeSize = '15%', // Default to a 15% fade size
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // Ref to store the GSAP tween instance
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Set initial position for a seamless loop
    const contentHeight = content.offsetHeight / 2;
    if (direction === 'bottom') {
      gsap.set(content, { y: -contentHeight });
    }

    const distanceToMove = direction === 'top' ? -contentHeight : 0;

    // Create the GSAP tween and store it in the ref
    tweenRef.current = gsap.to(content, {
      y: distanceToMove,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: (y) => (parseFloat(y) % contentHeight) + 'px',
      },
    });

    // Cleanup function to kill the tween on unmount
    return () => {
      tweenRef.current?.kill();
    };
  }, [children, direction, duration]);

  // Memoize the mask style object to prevent re-calculation on every render
  const maskStyle = useMemo(
    () => generateMaskStyle(fadeSides, fadeSize),
    [fadeSides, fadeSize]
  );

  // Event handlers for pausing and resuming the animation on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      tweenRef.current?.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      tweenRef.current?.resume();
    }
  };

  return (
    // The mask style and hover event handlers are applied here
    <div
      ref={scrollerRef}
      className={clsx('relative w-full h-full overflow-hidden', className)}
      style={maskStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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