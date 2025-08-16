import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image, { ImageProps } from 'next/image';
import { prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageProps extends Omit<ImageProps, 'ref'> {
  layout?: 'fill' | 'intrinsic' | 'responsive';
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'custom';
  containerClassName?: string;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  layout = 'fill',
  aspectRatio = 'square',
  containerClassName = '',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Get aspect ratio styles based on the aspectRatio prop
  const getAspectRatioStyles = useCallback(() => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'custom':
        return '';
      default:
        return 'aspect-square';
    }
  }, [aspectRatio]);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const cover = coverRef.current;

    if (!container || !image || !cover) return;

    // Check for reduced motion preference
    if (prefersReducedMotion()) {
      gsap.set(image, { scale: 1, opacity: 1 });
      gsap.set(cover, { xPercent: 100 });
      return;
    }

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
    });

    timelineRef.current = tl;

    tl.set(image, {
      scale: 1.25,
      opacity: 0,
    })
      .set(cover, {
        xPercent: 0,
      })
      .to(image, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      })
      .to(
        cover,
        {
          xPercent: 100,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        0
      );

    // --- START: THE FIX FOR BFCACHE ---
    const handlePageShow = (event: PageTransitionEvent) => {
      // If the page is being restored from the back-forward cache
      if (event.persisted) {
        // Refresh ScrollTrigger to re-evaluate all trigger positions and states.
        // This will make the animation fire correctly if it's in view on page restore.
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    // --- END: THE FIX FOR BFCACHE ---

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // --- Cleanup the event listener ---
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [aspectRatio]);

  // Handle different layout modes
  if (layout === 'responsive') {
    return (
      <div
        ref={containerRef}
        className={`relative shrink-0 inline-block overflow-hidden ${getAspectRatioStyles()} ${containerClassName}`}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          className={`${className}`}
          style={{
            objectFit: 'cover',
            transformOrigin: 'center center',
            transform: 'scale(1.25)',
            opacity: 0,
          }}
          {...props}
        />

        <div
          ref={coverRef}
          className="absolute top-0 left-0 w-full h-full bg-slate-100 z-10"
          style={{ transformOrigin: 'left center' }}
        />
      </div>
    );
  }

  if (layout === 'intrinsic') {
    return (
      <div
        ref={containerRef}
        className={`relative shrink-0 inline-block overflow-hidden ${containerClassName}`}
        style={{ display: 'inline-block', lineHeight: 0 }}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className}`}
          style={{
            objectFit: 'cover',
            transformOrigin: 'center center',
            transform: 'scale(1.25)',
            opacity: 0,
          }}
          {...props}
        />

        <div
          ref={coverRef}
          className="absolute top-0 left-0 w-full h-full bg-slate-100 z-10"
          style={{ transformOrigin: 'left center' }}
        />
      </div>
    );
  }

  // Default fill layout
  return (
    <div
      ref={containerRef}
      className={`relative shrink-0 inline-block overflow-hidden ${getAspectRatioStyles()} ${containerClassName}`}
      style={
        layout === 'fill' ? { width, height } : { display: 'inline-block', lineHeight: 0 }
      }
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        {...(layout === 'fill'
          ? { fill: true }
          : { width, height })}
        className={`${className}`}
        style={{
          objectFit: 'cover',
          transformOrigin: 'center center',
          transform: 'scale(1.25)',
          opacity: 0,
        }}
        {...props}
      />

      <div
        ref={coverRef}
        className="absolute top-0 left-0 w-full h-full bg-slate-100 z-10"
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  );
};

export default AnimatedImage;