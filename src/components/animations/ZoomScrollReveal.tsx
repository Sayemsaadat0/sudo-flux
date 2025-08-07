"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ZoomScrollRevealProps {
    videoUrl: string;
}

const ZoomScrollReveal: React.FC<ZoomScrollRevealProps> = ({ videoUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoHolderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        const videoHolder = videoHolderRef.current;

        if (!el || !videoHolder) return;
        
        // Let GSAP handle the performance optimization. 
        // GSAP automatically applies `will-change` when an animation starts
        // and removes it when it ends, which is more optimal than a static CSS class.
        // We'll also set a default ease for all animations in the timeline.
        gsap.set(videoHolder, { autoAlpha: 1, scale: 0.8 });

        const tl = gsap.timeline({
            ease: "none", // Use a linear ease for the smoothest mapping to scroll
            scrollTrigger: {
                trigger: el,
                start: "top 75%", 
                end: "bottom 25%", 
                // A scrub value of `true` links the animation directly to the scrollbar.
                // A number (e.g., 1) adds a smoothing effect. Start with `true` for responsiveness.
                scrub: true,
                // markers: true,
            },
        });

        // 1. Reveal Animation: Animate to full size and opacity
        tl.to(
            videoHolder,
            {
                autoAlpha: 1, // Use autoAlpha for performance (handles opacity and visibility)
                scale: 1,
            }
        )
        // 2. Hide Animation: Animate back down
        .to(
            videoHolder,
            {
                autoAlpha: 1,
                scale: 0.8,
            }
        );

        return () => {
            tl.kill();
            tl.scrollTrigger?.kill();
        };
    }, []);

    return (
        // Add more vertical padding to the trigger to give the animation room to breathe
        <div ref={containerRef} className="w-full mx-auto ">
            <div ref={videoHolderRef} className="w-full max-w-[1412px]  mx-auto px-4">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <iframe
                        width="100%"
                        src={videoUrl}
                        title="Zoom Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        // KEY PERFORMANCE FIX 2: Defer loading the iframe until it's needed
                        loading="lazy"
                        className="w-full h-[600px] "
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ZoomScrollReveal;