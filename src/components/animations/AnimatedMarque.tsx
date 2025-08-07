'use client';

import React, { useRef, useEffect, ReactNode, useMemo, CSSProperties } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import Image from 'next/image';

interface AnimatedMarqueProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    duration?: number;
    className?: string;
    textClassName?: string;
    hoverBgClassName?: string;
    duplicateNumber?: number;
    hoverImageUrl?: string;
    fadeLeft?: boolean;
    fadeRight?: boolean;
    fadeWidth?: number;
    isHoverActive?: boolean;
    pauseOnHover?: boolean;
}

const AnimatedMarque: React.FC<AnimatedMarqueProps> = ({
    children,
    direction = 'left',
    duration = 20,
    className,
    textClassName,
    hoverBgClassName,
    duplicateNumber = 5,
    hoverImageUrl,
    fadeLeft = false,
    fadeRight = false,
    fadeWidth = 100,
    isHoverActive = true,
    pauseOnHover = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeContentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

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
        
        tweenRef.current = tween;
        
        return () => {
            tween.kill();
            tweenRef.current = null;
        };
    }, [children, direction, duration]);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;

        if (!container) return;

        // Combined hover handlers for both pause and image functionality
        const onMouseEnter = () => {
            // Handle pause on hover
            if (pauseOnHover && tweenRef.current) {
                tweenRef.current.pause();
            }
            
            // Handle hover image
            if (isHoverActive && hoverImageUrl && image) {
                gsap.to(image, { scale: 1, autoAlpha: 1, duration: 0.3 });
            }
        };

        const onMouseLeave = () => {
            // Handle resume on hover leave
            if (pauseOnHover && tweenRef.current) {
                tweenRef.current.resume();
            }
            
            // Handle hover image
            if (isHoverActive && hoverImageUrl && image) {
                gsap.to(image, { scale: 0, autoAlpha: 0, duration: 0.3 });
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isHoverActive || !hoverImageUrl || !image) return;
            
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const imageDimensions = { width: image.offsetWidth, height: image.offsetHeight };
            const targetX = mouseX - imageDimensions.width / 2;
            const targetY = mouseY - imageDimensions.height / 2;
            gsap.to(image, { x: targetX, y: targetY, duration: 0.6, ease: 'power2.out' });
        };

        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);
        container.addEventListener('mousemove', onMouseMove);

        // Initialize image if needed
        if (isHoverActive && hoverImageUrl && image) {
            gsap.set(image, { scale: 0, autoAlpha: 0 });
        }

        return () => {
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
            container.removeEventListener('mousemove', onMouseMove);
        };
    }, [hoverImageUrl, isHoverActive, pauseOnHover]);

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
                <div ref={marqueeContentRef} className="flex whitespace-nowrap items-center">
                    {Array.from({ length: duplicateNumber }).map((_, i) => (
                        <div
                            key={i}
                            className={clsx(
                                'flex-shrink-0 text-sudo-neutral-6 group-hover:text-white transition-colors duration-500 relative z-10',
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