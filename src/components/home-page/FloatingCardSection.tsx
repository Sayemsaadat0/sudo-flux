

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

// Color palette remains the same
const colorSchemes = [
  { text: 'text-cyan-300', border: 'border-cyan-500', shadow: 'shadow-cyan-500/50' },
  { text: 'text-pink-300', border: 'border-pink-500', shadow: 'shadow-pink-500/50' },
  { text: 'text-emerald-300', border: 'border-emerald-500', shadow: 'shadow-emerald-500/50' },
  { text: 'text-yellow-300', border: 'border-yellow-500', shadow: 'shadow-yellow-500/50' },
  { text: 'text-indigo-300', border: 'border-indigo-500', shadow: 'shadow-indigo-500/50' },
  { text: 'text-rose-300', border: 'border-rose-500', shadow: 'shadow-rose-500/50' },
  { text: 'text-sky-300', border: 'border-sky-500', shadow: 'shadow-sky-500/50' },
  { text: 'text-lime-300', border: 'border-lime-500', shadow: 'shadow-lime-500/50' },
];

// Card data remains the same
const cardsData = [
  { id: 1, title: 'Project Alpha', link: '/projects/alpha' },
  { id: 2, title: 'Our Services', link: '/services' },
  { id: 3, title: 'Our Dedicated Team', link: '/about' },
  { id: 4, title: 'Client Showcase', link: '/clients' },
  { id: 5, title: 'Contact Us Now', link: '/contact' },
  { id: 6, title: 'Latest on the Blog', link: '/blog' },
  { id: 7, title: 'Careers', link: '/careers' },
  { id: 8, title: 'Our Process', link: '/process' },
];

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
const checkOverlap = (rect1: Rect, rect2: Rect, padding = 20) => {
  return (
    rect1.x < rect2.x + rect2.width + padding &&
    rect1.x + rect1.width + padding > rect2.x &&
    rect1.y < rect2.y + rect2.height + padding &&
    rect1.y + rect1.height + padding > rect2.y
  );
};

const FloatingCardsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  
  const MAX_ATTEMPTS_PER_CARD = 200;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || cardsRef.current.length === 0) return;

    const placedCards: Rect[] = [];

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        let finalPosition: { x: number; y: number } | null = null;
        let attempts = 0;

        if (index === 0) {
          finalPosition = {
            x: container.offsetWidth / 2 - cardRect.width / 2 + gsap.utils.random(-50, 50),
            y: container.offsetHeight / 2 - cardRect.height / 2 + gsap.utils.random(-50, 50),
          };
        } else {
          while (!finalPosition && attempts < MAX_ATTEMPTS_PER_CARD) {
            const parentCard = placedCards[Math.floor(Math.random() * placedCards.length)];
            const angle = Math.random() * 2 * Math.PI;
            const distance = gsap.utils.random(parentCard.width / 2, parentCard.width * 1.5);
            
            const candidatePos = {
              x: (parentCard.x + parentCard.width / 2) + Math.cos(angle) * distance - cardRect.width / 2,
              y: (parentCard.y + parentCard.height / 2) + Math.sin(angle) * distance - cardRect.height / 2,
            };
            const candidateRect: Rect = { ...candidatePos, width: cardRect.width, height: cardRect.height };

            const isOverlapping = placedCards.some(p => checkOverlap(candidateRect, p));
            const isOutOfBounds = 
                candidatePos.x < 0 || 
                candidatePos.x + cardRect.width > container.offsetWidth || 
                candidatePos.y < 0 || 
                candidatePos.y + cardRect.height > container.offsetHeight;

            if (!isOverlapping && !isOutOfBounds) {
              finalPosition = candidatePos;
            }
            attempts++;
          }
        }
        
        if (!finalPosition) {
           finalPosition = {
             x: gsap.utils.random(0, container.offsetWidth - cardRect.width),
             y: gsap.utils.random(0, container.offsetHeight - cardRect.height),
           };
        }

        placedCards.push({ ...finalPosition, width: cardRect.width, height: cardRect.height });

        const initialScale = gsap.utils.random(0.9, 1.1);
        gsap.set(card, { x: finalPosition.x, y: finalPosition.y, scale: initialScale });

        gsap.to(card, {
          y: finalPosition.y + gsap.utils.random(-15, 15),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        const bounceTween = gsap.to(card, {
          scale: initialScale * gsap.utils.random(0.95, 1.05),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2),
        });

        card.addEventListener('mouseenter', () => {
          bounceTween.pause();
          gsap.to(card, { scale: 1.2, zIndex: 10, duration: 0.3, ease: 'power2.out' });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: initialScale,
            zIndex: 1,
            duration: 0.3,
            ease: 'power2.out',
            // --- THIS IS THE FIX ---
            onComplete: () => {
              bounceTween.resume();
            },
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-[400px] h-[400px] overflow-hidden bg-gray-900" ref={containerRef}>
      {cardsData.map((card, index) => {
        const colorScheme = colorSchemes[index % colorSchemes.length];
        return (
          <Link
            key={card.id}
            href={card.link}
            className={`
              absolute will-change-transform cursor-pointer
              flex items-center justify-center text-center
              bg-gray-800/80 backdrop-blur-sm
              border-2 shadow-lg transition-shadow duration-300 hover:shadow-2xl
              rounded-3xl
              p-4 md:p-6
              ${colorScheme.text} 
              ${colorScheme.border}
              ${colorScheme.shadow}
            `}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
          >
            <h3 className="m-0 font-semibold text-base md:text-lg lg:text-xl whitespace-nowrap">
              {card.title}
            </h3>
          </Link>
        );
      })}
    </section>
  );
};

export default FloatingCardsSection;