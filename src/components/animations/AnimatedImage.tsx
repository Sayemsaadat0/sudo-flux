import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image, { ImageProps } from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageProps extends Omit<ImageProps, 'ref'> {
  layout?: 'fill' | 'intrinsic';
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  layout = 'fill',
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

    // IMPORTANT: Removed the `data-gsap-animated` check.
    // ScrollTrigger's `once: true` is sufficient and won't block the bfcache fix.

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
    });

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
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();

      // --- Cleanup the event listener ---
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative shrink-0 inline-block overflow-hidden ${className}`}
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