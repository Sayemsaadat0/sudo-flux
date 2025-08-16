"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ZoomScrollRevealProps {
    videoUrl: string;
}

const ZoomScrollReveal: React.FC<ZoomScrollRevealProps> = ({ videoUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoHolderRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Debounced resize handler
    const checkMobile = useCallback(() => {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
            setIsMobile(newIsMobile);
        }
    }, [isMobile]);

    // Debounced resize listener
    const handleResize = useCallback(() => {
        if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
        }
        resizeTimeoutRef.current = setTimeout(checkMobile, 250);
    }, [checkMobile]);

    // Handle play button click
    const handlePlayClick = useCallback(() => {
        setIsPlaying(true);
    }, []);

    useEffect(() => {
        // Initial check
        checkMobile();

        // Add debounced resize listener
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [checkMobile, handleResize]);

    useEffect(() => {
        const el = containerRef.current;
        const videoHolder = videoHolderRef.current;

        if (!el || !videoHolder) return;
        
        // Kill existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }
        
        if (isMobile) {
            // For mobile devices, set scale to 1 and no animation
            gsap.set(videoHolder, { autoAlpha: 1, scale: 1 });
            return;
        }
        
        // Set initial state
        gsap.set(videoHolder, { autoAlpha: 1, scale: 0.8 });

        const tl = gsap.timeline({
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%", 
                end: "bottom 20%", 
                // Use scrub for smooth scroll-linked animation
                scrub: 1,
                // Add performance optimizations
                fastScrollEnd: true,
                preventOverlaps: true,
                // markers: true, // Uncomment for debugging
            },
        });

        // Store timeline reference
        timelineRef.current = tl;

        // Scroll-linked animation: scale from 0.8 to 1 and back to 0.8
        tl.to(videoHolder, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
        })
        .to(videoHolder, {
            scale: 0.8,
            duration: 1,
            ease: "power2.out",
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
        };
    }, [isMobile]);

    // Create the video URL with autoplay parameter when playing
    const getVideoUrl = () => {
        if (!isPlaying) return videoUrl;
        const separator = videoUrl.includes('?') ? '&' : '?';
        return `${videoUrl}${separator}autoplay=1&mute=1`;
    };

    return (
        // Add more vertical padding to the trigger to give the animation room to breathe
        <div ref={containerRef} className="w-full mx-auto">
            <div 
                ref={videoHolderRef} 
                className={`w-full max-w-[1412px] mx-auto px-4 ${isMobile ? '' : 'transform-gpu'}`}
            >
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div className={`relative w-full ${isMobile ? 'aspect-video' : 'sm:h-[400px] md:h-[500px] lg:h-[650px] '}`}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={getVideoUrl()}
                            title="Zoom Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            // KEY PERFORMANCE FIX 2: Defer loading the iframe until it's needed
                            loading="lazy"
                            className="absolute inset-0 w-full h-full"
                        />
                        
                        {/* Overlay Layer with Play Button */}
                        {!isPlaying && (
                            <div className="absolute inset-0 bg-sudo-neutral-6/10 flex items-center justify-center z-10">
                                <button
                                    onClick={handlePlayClick}
                                    className="bg-white/90 hover:bg-white transition-all duration-300 rounded-full p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transform hover:scale-110 group"
                                    aria-label="Play video"
                                >
                                    <Play 
                                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-sudo-neutral-6 ml-1 group-hover:text-sudo-blue-6 transition-colors duration-300" 
                                        fill="currentColor"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoomScrollReveal;