// src/components/animations/AnimatedImage.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. Make sure ScrollTrigger is imported
import Image, { ImageProps } from 'next/image';

// This only needs to be done once in your app, e.g., in _app.tsx or a layout component.
// But it doesn't hurt to have it here to ensure it's registered.
gsap.registerPlugin(ScrollTrigger);

// Props interface remains the same
interface AnimatedImageProps extends Omit<ImageProps, 'ref'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  layout,
  objectFit = 'cover',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const cover = coverRef.current;

    if (!container || !image || !cover) return;

    // --- Create the animation timeline ---
    // We create the timeline but don't play it immediately.
    // ScrollTrigger will be in control of playing it.
    const tl = gsap.timeline({
      // 2. Attach a ScrollTrigger to the timeline
      scrollTrigger: {
        trigger: container, // The animation will start when `container` enters the viewport
        start: 'top 85%',    // "when the top of the trigger hits 85% of the viewport height"
        once: true,          // 3. This is key: ensures the animation runs only ONCE
      },
    });

    // Set initial states directly in the timeline for cleaner setup
    tl.set(image, {
      scale: 1.25,
      opacity: 0,
    })
    .set(cover, {
      xPercent: 0,
    })
    // Now, define the animation sequence
    .to(image, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    })
    .to(cover, {
      xPercent: -100, // Move the cover completely to the left
      duration: 1.2,
      ease: 'power3.inOut',
    }, 0); // The '0' makes this animation start at the same time as the image scale animation

    // 4. Cleanup function to kill the trigger when the component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []); // The empty dependency array is correct, ScrollTrigger handles the rest.

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      // This style logic correctly handles responsive vs fixed layouts
      style={layout === 'responsive' ? { width: '100%', height: 'auto' } : { width, height }}
    >
      {/* 
        CLEANED UP Image component. 
        - The `style` prop is simplified. 
        - GSAP handles the animation, so we only need initial states here for no-JS fallbacks.
      */}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={layout}
        style={{
          objectFit,
          transformOrigin: 'center center',
          transform: 'scale(1.25)',
          opacity: 0,
        }}
        {...props}
      />

      {/* 
        The cover should start on the LEFT and move RIGHT to reveal the image.
        This is a more intuitive setup.
      */}
      <div
        ref={coverRef}
        className="absolute top-0 left-0 w-full h-full bg-white/90 z-10"
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  );
};

export default AnimatedImage;