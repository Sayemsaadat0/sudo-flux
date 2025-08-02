import React, { useEffect } from "react";
import clsx from "clsx";

import {
    motion,
    useAnimation,
    useMotionValue,
    MotionValue,
    Transition,
} from "framer-motion";
interface CircularTextProps {
    text: string;
    spinDuration?: number;
    onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
    className?: string;
    letterClassName?: string; // ✅ new prop
    size?: number;
}


const getRotationTransition = (
    duration: number,
    from: number,
    loop: boolean = true
) => ({
    from,
    to: from + 360,
    ease: "linear" as const,
    duration,
    type: "tween" as const,
    repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
    },
});

const CircularText: React.FC<CircularTextProps> = ({
    text,
    spinDuration = 20,
    onHover = "speedUp",
    className = "",
    letterClassName,
    size = 200, // 👈 default size
}) => {
    const radius = size / 2.6; // 👈 controls how far letters are from center
    const letters = Array.from(text);
    const controls = useAnimation();
    const rotation: MotionValue<number> = useMotionValue(0);

    useEffect(() => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start),
        });
    }, [spinDuration, text, onHover, controls, rotation]);

    const handleHoverStart = () => {
        const start = rotation.get();

        if (!onHover) return;

        let transitionConfig: ReturnType<typeof getTransition> | Transition;
        let scaleVal = 1;

        switch (onHover) {
            case "slowDown":
                transitionConfig = getTransition(spinDuration * 2, start);
                break;
            case "speedUp":
                transitionConfig = getTransition(spinDuration / 4, start);
                break;
            case "pause":
                transitionConfig = {
                    rotate: { type: "spring", damping: 20, stiffness: 300 },
                    scale: { type: "spring", damping: 20, stiffness: 300 },
                };
                break;
            case "goBonkers":
                transitionConfig = getTransition(spinDuration / 20, start);
                scaleVal = 0.8;
                break;
            default:
                transitionConfig = getTransition(spinDuration, start);
        }

        controls.start({
            rotate: start + 360,
            scale: scaleVal,
            transition: transitionConfig,
        });
    };

    const handleHoverEnd = () => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start),
        });
    };

    return (
        <div className="relative group rounded-full overflow-hidden border border-sudo-purple-3 ">
            <div className="absolute bg-sudo-purple-3 w-12 h-12 group-hover:w-40 group-hover:h-40 transition-all duration-500 ease-in-out  rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute  p-3 group-hover: border border-sudo-purple-3 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 19L19 5M5 5h14v14" />
                </svg>
            </div>
            <motion.div
                className={clsx(
                    "m-0 mx-auto  rounded-full relative font-black text-black text-center cursor-pointer origin-center",
                    className
                )}
                style={{
                    rotate: rotation,
                    width: size,
                    height: size,
                }}
                initial={{ rotate: 0 }}
                animate={controls}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
            >

                <div className="">
                    {letters.map((letter, i) => {
                        const angle = (360 / letters.length) * i;
                        const transform = `rotateZ(${angle}deg) translate3d(${radius}px, 0, 0)`;

                        return (
                            <span
                                key={i}
                                className={clsx(
                                    "absolute left-1/2 top-1/2  transform-gpu -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]",
                                    letterClassName
                                )}
                                style={{ transform, WebkitTransform: transform }}
                            >
                                {letter}
                            </span>

                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default CircularText;
