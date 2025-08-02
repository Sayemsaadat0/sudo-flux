
'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import Image from 'next/image';

// Props interface remains the same
interface TextMarqueProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    duration?: number;
    className?: string;
    textClassName?: string;
    hoverBgClassName?: string;
    hoverImageUrl?: string;
}

const TextMarque: React.FC<TextMarqueProps> = ({
    children,
    direction = 'left',
    duration = 20,
    className,
    textClassName,
    hoverBgClassName,
    hoverImageUrl,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeContentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

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

        if (!hoverImageUrl || !container || !image) return;

        gsap.set(image, { scale: 0, autoAlpha: 0 });

        // Use a variable to store dimensions for performance.
        // We'll update it on mouse enter.
        let imageDimensions = { width: 0, height: 0 };

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // THE KEY CHANGE: Calculate the target position for the top-left corner
            // by subtracting half the image's dimensions from the mouse position.
            const targetX = mouseX - imageDimensions.width / 2;
            const targetY = mouseY - imageDimensions.height / 2;

            gsap.to(image, {
                x: targetX,
                y: targetY,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const onMouseEnter = () => {
            // Get the image's rendered dimensions once when the mouse enters.
            imageDimensions = {
                width: image.offsetWidth,
                height: image.offsetHeight,
            };
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
    }, [hoverImageUrl]);

    return (
        <div
            ref={containerRef}
            className={clsx(
                'relative w-full group ',
                className
            )}
        >
            <div className="relative overflow-hidden py-5">
                <div
                    className={clsx(
                        'absolute  w-full h-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 group-hover:h-full transition-all duration-500 ease-in-out',
                        'bg-sudo-blue-6',
                        hoverBgClassName
                    )}
                />
                <div ref={marqueeContentRef} className="flex whitespace-nowrap">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={clsx(
                                'px-4 text-sudo-neutral-6 group-hover:text-white transition-colors duration-500 relative z-10',
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
                        'pointer-events-none' // IMPORTANT: Prevents the image from blocking mouse events
                    )}
                />
            )}
        </div>
    );
};

export default TextMarque;
