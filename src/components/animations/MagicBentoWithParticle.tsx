// src/components/ui/MagicBento.tsx

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { gsap } from "gsap";

// --- PROPS INTERFACES ---

export interface BentoCardProps {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  enableStars?: boolean;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  particleCount?: number;
  glowColor?: string;
  disableAnimations?: boolean;
}

export interface MagicBentoWithParticleProps {
  children: ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

// --- CONSTANTS AND UTILS ---

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

// --- SUB-COMPONENTS (Implementation Details) ---

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
  radius: number;
  glowColor: string;
}> = ({ gridRef, enabled, radius, glowColor }) => {
  useEffect(() => {
    if (!enabled || !gridRef.current) return;
    const spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position: fixed; width: ${radius * 2}px; height: ${radius * 2}px;
      border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor}, 0.1) 0%, transparent 70%);
      z-index: 1; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    const handleMouseMove = (e: MouseEvent) => {
      const cards = gridRef.current?.querySelectorAll(".bento-card") || [];
      let isOverCard = false;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          isOverCard = true;
        }
        const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
        const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty("--glow-x", `${relativeX}%`);
        (card as HTMLElement).style.setProperty("--glow-y", `${relativeY}%`);
      });
      gsap.to(spotlight, { left: e.clientX, top: e.clientY, opacity: isOverCard ? 1 : 0, duration: 0.3, ease: "power2.out" });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      spotlight.remove();
    };
  }, [enabled, gridRef, radius, glowColor]);
  return null;
};

// --- REUSABLE EXPORTED COMPONENTS ---

export const BentoCard: React.FC<BentoCardProps> = ({
  children, className = "", style, icon, title, description,
  enableStars = true, enableTilt = true, clickEffect = true, enableMagnetism = true,
  particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR, disableAnimations = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card || disableAnimations) return;
    const timeouts: NodeJS.Timeout[] = [];
    const particles: HTMLDivElement[] = [];
    const handleMouseEnter = () => {
      if (enableStars) {
        for (let i = 0; i < particleCount; i++) {
          const timeoutId = setTimeout(() => {
            const { width, height } = card.getBoundingClientRect();
            const p = document.createElement("div");
            p.style.cssText = `position: absolute; left: ${Math.random() * width}px; top: ${Math.random() * height}px; width: 4px; height: 4px; border-radius: 50%; background: rgba(${glowColor}, 1); box-shadow: 0 0 6px rgba(${glowColor}, 0.6); pointer-events: none; z-index: 100;`;
            card.appendChild(p);
            particles.push(p);
            gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
          }, i * 50);
          timeouts.push(timeoutId);
        }
      }
    };
    const handleMouseLeave = () => {
      timeouts.forEach(clearTimeout);
      particles.forEach(p => gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() }));
      particles.length = 0;
      if (enableTilt) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(card, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const centerX = rect.width / 2; const centerY = rect.height / 2;
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        gsap.to(card, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        gsap.to(card, { x: (x - centerX) * 0.05, y: (y - centerY) * 0.05, duration: 0.3, ease: 'power2.out' });
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement("div");
      ripple.style.cssText = `position: absolute; left: ${e.clientX - rect.left}px; top: ${e.clientY - rect.top}px; width: 0; height: 0; border-radius: 50%; background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, transparent 70%); transform: translate(-50%, -50%); pointer-events: none; z-index: 99;`;
      card.appendChild(ripple);
      gsap.to(ripple, { width: rect.width * 2, height: rect.width * 2, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
    };
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('click', handleClick);
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('click', handleClick);
      timeouts.forEach(clearTimeout);
      particles.forEach(p => p.remove());
    };
  }, [disableAnimations, enableStars, enableTilt, enableMagnetism, clickEffect, glowColor, particleCount]);
  return (
    <div ref={cardRef} className={`bento-card ${className}`} style={style}>
      <div className="flex flex-col h-full">
        {icon && <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 p-3 text-white">{icon}</div>}
        {title && <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>}
        {description && <p className="text-sm text-neutral-300">{description}</p>}
        <div className="flex-grow" />
        {children}
      </div>
    </div>
  );
};

export const MagicBentoWithParticle: React.FC<MagicBentoWithParticleProps> = ({
  children, className = "", enableSpotlight = true, enableBorderGlow = true,
  disableAnimations = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>{`
          .bento-grid-container { --glow-color: ${glowColor}; --border-color: #392e4e; --background-dark: #060010; }
          .bento-card { background-color: var(--background-dark); border: 1px solid var(--border-color); position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .bento-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
          .bento-card.border-glow::after {
            content: ''; position: absolute; inset: -2px;
            background: radial-gradient(var(--spotlight-radius, ${spotlightRadius}px) circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(var(--glow-color), 0.7), transparent 40%);
            border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity 0.3s ease; z-index: 0;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor; mask-composite: exclude;
          }
          .bento-card.border-glow:hover::after { opacity: 1; }
        `}</style>
      <div ref={gridRef} className={`bento-grid-container ${className}`}>
        {!shouldDisableAnimations && enableSpotlight && (
          <GlobalSpotlight gridRef={gridRef} enabled={enableSpotlight} radius={spotlightRadius} glowColor={glowColor}/>
        )}
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          
          // FINAL FIX: The type assertion must include all props being passed down.
          // This tells TypeScript the "contract" for children of MagicBentoWithParticle.
          const childWithProps = child as React.ReactElement<{
            className?: string;
            disableAnimations?: boolean;
            glowColor?: string;
          }>;

          return React.cloneElement(childWithProps, {
            // Now TypeScript knows these props are valid.
            disableAnimations: shouldDisableAnimations,
            glowColor,
            className: `${childWithProps.props.className || ""} ${enableBorderGlow ? "border-glow" : ""}`.trim(),
          });
        })}
      </div>
    </>
  );
};