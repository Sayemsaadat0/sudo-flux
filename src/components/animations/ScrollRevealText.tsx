// import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface ScrollRevealTextProps {
//   children: ReactNode;
//   scrollContainerRef?: RefObject<HTMLElement>;
//   enableBlur?: boolean;
//   baseOpacity?: number;
//   baseRotation?: number;
//   blurStrength?: number;
//   containerClassName?: string;
//   textClassName?: string;
//   rotationEnd?: string;
//   wordAnimationEnd?: string;
// }

// const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
//   children,
//   scrollContainerRef,
//   enableBlur = true,
//   baseOpacity = 0.1,
//   baseRotation = 3,
//   blurStrength = 4,
//   containerClassName = "",
//   textClassName = "",
//   rotationEnd = "bottom bottom",
//   wordAnimationEnd = "bottom bottom",
// }) => {
//   const containerRef = useRef<HTMLHeadingElement>(null);

//   const splitText = useMemo(() => {
//     const text = typeof children === "string" ? children : "";
//     return text.split(/(\s+)/).map((word, index) => {
//       if (word.match(/^\s+$/)) return word;
//       return (
//         <span className="inline-block word" key={index}>
//           {word}
//         </span>
//       );
//     });
//   }, [children]);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const scroller =
//       scrollContainerRef && scrollContainerRef.current
//         ? scrollContainerRef.current
//         : window;

//     gsap.fromTo(
//       el,
//       { transformOrigin: "0% 50%", rotate: baseRotation },
//       {
//         ease: "none",
//         rotate: 0,
//         scrollTrigger: {
//           trigger: el,
//           scroller,
//           start: "top bottom",
//           end: rotationEnd,
//           scrub: true,
//         },
//       }
//     );

//     const wordElements = el.querySelectorAll<HTMLElement>(".word");

//     gsap.fromTo(
//       wordElements,
//       { opacity: baseOpacity, willChange: "opacity" },
//       {
//         ease: "none",
//         opacity: 1,
//         stagger: 0.05,
//         scrollTrigger: {
//           trigger: el,
//           scroller,
//           start: "top bottom-=20%",
//           end: wordAnimationEnd,
//           scrub: true,
//         },
//       }
//     );

//     if (enableBlur) {
//       gsap.fromTo(
//         wordElements,
//         { filter: `blur(${blurStrength}px)` },
//         {
//           ease: "none",
//           filter: "blur(0px)",
//           stagger: 0.05,
//           scrollTrigger: {
//             trigger: el,
//             scroller,
//             start: "top bottom-=20%",
//             end: wordAnimationEnd,
//             scrub: true,
//           },
//         }
//       );
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [
//     scrollContainerRef,
//     enableBlur,
//     baseRotation,
//     baseOpacity,
//     rotationEnd,
//     wordAnimationEnd,
//     blurStrength,
//   ]);

//   return (
//     <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
//       <p
//         className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
//       >
//         {splitText}
//       </p>
//     </h2>
//   );
// };

// export default ScrollRevealText;

// src/components/ScrollRevealText.tsx
import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface ColoredWord {
    text: string;
    className?: string; // Tailwind or custom classes
    style?: React.CSSProperties;
}

interface ScrollRevealTextProps {
    text: string;
    coloredWords: ColoredWord[];
    className?: string; // For main container wrapper
}

const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
    text,
    coloredWords,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const processedText = useMemo(() => {
        if (!coloredWords || coloredWords.length === 0) {
            return text.split('').map((char, index) => (
                <span key={index} className={clsx('anim-char', 'inline-block')}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ));
        }

        const regex = new RegExp(
            `(${coloredWords.map((cw) => escapeRegExp(cw.text)).join('|')})`,
            'g'
        );

        const parts = text.split(regex);

        return parts.map((part, index) => {
            const coloredWord = coloredWords.find((cw) => cw.text === part);

            if (coloredWord) {
                return (
                    <span
                        key={index}
                        className={clsx('anim-char', 'inline-block', coloredWord.className)}
                        style={coloredWord.style}
                    >
                        {part}
                    </span>
                );
            }

            return part.split('').map((char, charIndex) => (
                <span key={`${index}-${charIndex}`} className={clsx('anim-char', 'inline-block')}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ));
        });
    }, [text, coloredWords]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const chars = el.querySelectorAll('.anim-char');
        if (chars.length === 0) return;

        gsap.set(chars, {
            opacity: 0.2,
            filter: 'grayscale(100%)',
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'bottom 60%',
                scrub: 1,
            },
        });

        tl.to(chars, {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.1,
            ease: 'power2.out',
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [processedText]);

    return (
        <div ref={containerRef} className={clsx('w-full text-2xl md:text-4xl lg:text-5xl font-bold leading-tight', className)}>
            <p >
                {processedText}
            </p>
        </div>
    );
};

export default ScrollRevealText;
