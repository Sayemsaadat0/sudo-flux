// src/components/CountUp.tsx
import { useEffect, useRef, cloneElement, isValidElement, ReactElement } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
    to: number;
    from?: number;
    direction?: "up" | "down";
    delay?: number;
    duration?: number;
    className?: string;
    startWhen?: boolean;
    separator?: string;
    onStart?: () => void;
    onEnd?: () => void;
    icon?: ReactElement<{ size?: number }>;
    iconPosition?: "before" | "after";
    iconClassName?: string;
    iconSize?: number; // Size in pixels
}

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    onStart,
    onEnd,
    icon,
    iconPosition = "before",
    iconClassName = "",
    iconSize,
}: CountUpProps) {
    // ref for the number span itself, to update its textContent
    const numberRef = useRef<HTMLSpanElement>(null);
    
    // ref for the container, to track when it enters the viewport
    const containerRef = useRef<HTMLSpanElement>(null);
    
    const isInView = useInView(containerRef, { once: true, margin: "0px" });

    const motionValue = useMotionValue(direction === "down" ? to : from);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        mass: 1 / duration,
    });

    const getDecimalPlaces = (num: number): number => {
        const str = String(num);
        return str.includes(".") ? str.split(".")[1].length : 0;
    };
    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    // Effect to start the animation when the component is in view
    useEffect(() => {
        if (isInView && startWhen) {
            onStart?.();

            const animationTimeout = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const endTimeout = setTimeout(() => {
                onEnd?.();
            }, (delay + duration) * 1000);

            return () => {
                clearTimeout(animationTimeout);
                clearTimeout(endTimeout);
            };
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

    // Effect to update the number display
    useEffect(() => {
        // Helper to format the number consistently
        const formatNumber = (num: number) => {
            const options: Intl.NumberFormatOptions = {
                useGrouping: !!separator,
                minimumFractionDigits: maxDecimals,
                maximumFractionDigits: maxDecimals,
            };
            const formatted = new Intl.NumberFormat("en-US", options).format(num);
            return separator ? formatted.replace(/,/g, separator) : formatted;
        };
        
        // **FIX**: Set the initial text content on mount so it's not invisible.
        // It reads the initial value directly from `motionValue`.
        if (numberRef.current) {
            numberRef.current.textContent = formatNumber(motionValue.get());
        }

        // Subscribe to spring changes to update the number during animation
        const unsubscribe = springValue.on("change", (latest) => {
            if (numberRef.current) {
                numberRef.current.textContent = formatNumber(latest);
            }
        });

        return () => unsubscribe();
    }, [springValue, separator, maxDecimals, motionValue]);

    const renderIcon = () => {
        if (!isValidElement(icon)) return null;
        const iconProps = iconSize ? { size: iconSize } : {};
        return (
            <span className={`${iconPosition === 'before' ? 'mr-1' : 'ml-1'} ${iconClassName}`}>
                {cloneElement(icon, iconProps)}
            </span>
        );
    };

    // **FIX**: Unified and cleaner JSX structure.
    // The `containerRef` is always on the parent element for `useInView`.
    // The `numberRef` is always on the number's span.
    return (
        <span ref={containerRef} className="inline-flex items-center">
            {icon && iconPosition === "before" && renderIcon()}
            <span ref={numberRef} className={className} />
            {icon && iconPosition === "after" && renderIcon()}
        </span>
    );
}