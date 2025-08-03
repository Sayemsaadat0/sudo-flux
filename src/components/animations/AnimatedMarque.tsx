'use client';

import React, { useRef, useEffect, ReactNode, useMemo, CSSProperties } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import Image from 'next/image';

// --- MODIFIED Props interface ---
interface AnimatedMarqueProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    duration?: number;
    className?: string;
    textClassName?: string;
    hoverBgClassName?: string;
    hoverImageUrl?: string;
    fadeLeft?: boolean;
    fadeRight?: boolean;
    fadeWidth?: number;
    /** If false, all hover effects (background, text color, image) will be disabled. Defaults to true. */
    isHoverActive?: boolean;
}

const AnimatedMarque: React.FC<AnimatedMarqueProps> = ({
    children,
    direction = 'left',
    duration = 20,
    className,
    textClassName,
    hoverBgClassName,
    hoverImageUrl,
    fadeLeft = false,
    fadeRight = false,
    fadeWidth = 100,
    // --- NEW PROP with default value ---
    isHoverActive = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeContentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Memoized style for the fade mask (no changes here)
    const maskStyle = useMemo((): CSSProperties => {
        if (!fadeLeft && !fadeRight) return {};
        const colorStops: string[] = [];
        if (fadeLeft) {
            colorStops.push('transparent 0%');
            colorStops.push(`black ${fadeWidth}px`);
        } else {
            colorStops.push('black 0%');
        }
        if (fadeRight) {
            colorStops.push(`black calc(100% - ${fadeWidth}px)`);
            colorStops.push('transparent 100%');
        } else {
            colorStops.push('black 100%');
        }
        const maskImageValue = `linear-gradient(to right, ${colorStops.join(', ')})`;
        return {
            maskImage: maskImageValue,
            WebkitMaskImage: maskImageValue,
        };
    }, [fadeLeft, fadeRight, fadeWidth]);

    // Marquee scroll effect (no changes here)
    useEffect(() => {
        const content = marqueeContentRef.current;
        if (!content || !content.children[0]) return;
        const itemWidth = content.children[0].getBoundingClientRect().width;
        const distanceToMove = direction === 'left' ? -itemWidth : itemWidth;
        if (direction === 'right') {
            gsap.set(content, { x: -itemWidth });
        }
        const tween = gsap.to(content, {
            x: `+=${distanceToMove}`,
            duration: duration,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: (x) => (parseFloat(x) % itemWidth) + 'px',
            },
        });
        return () => {
            tween.kill();
        };
    }, [children, direction, duration]);

    // --- MODIFIED Effect for the hover image ---
    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;

        // --- KEY CHANGE: Exit early if hover is disabled or image is not provided ---
        if (!isHoverActive || !hoverImageUrl || !container || !image) {
            return; // Do not attach any event listeners
        }

        gsap.set(image, { scale: 0, autoAlpha: 0 });
        let imageDimensions = { width: 0, height: 0 };

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const targetX = mouseX - imageDimensions.width / 2;
            const targetY = mouseY - imageDimensions.height / 2;
            gsap.to(image, { x: targetX, y: targetY, duration: 0.6, ease: 'power2.out' });
        };
        const onMouseEnter = () => {
            imageDimensions = { width: image.offsetWidth, height: image.offsetHeight };
            gsap.to(image, { scale: 1, autoAlpha: 1, duration: 0.3 });
        };
        const onMouseLeave = () => {
            gsap.to(image, { scale: 0, autoAlpha: 0, duration: 0.3 });
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);

        return () => {
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
        };
        // --- Add isHoverActive to dependency array ---
    }, [hoverImageUrl, isHoverActive]);

    return (
        <div
            ref={containerRef}
            className={clsx(
                'relative w-full',
                { 'group': isHoverActive },
                className
            )}
        >
            <div
                className="relative overflow-hidden py-5"
                style={maskStyle}
            >
            
                <div
                    className={clsx(
                        'absolute w-full h-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 group-hover:h-full transition-all duration-500 ease-in-out',
                        'bg-sudo-blue-6',
                        hoverBgClassName
                    )}
                />
                <div ref={marqueeContentRef} className="flex whitespace-nowrap">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={clsx(
                                'px-2 text-sudo-neutral-6 group-hover:text-white transition-colors duration-500 relative z-10',
                                textClassName
                            )}
                        >
                            {children}
                        </div>
                    ))}
                </div>
            </div>
            {hoverImageUrl && (
                <Image
                    ref={imageRef}
                    width={300}
                    height={600}
                    src={hoverImageUrl}
                    alt="Hover detail"
                    className={clsx(
                        'absolute top-0 left-0 w-40 h-56 object-cover rounded-lg shadow-2xl z-20',
                        'pointer-events-none'
                    )}
                />
            )}
        </div>
    );
};

export default AnimatedMarque;