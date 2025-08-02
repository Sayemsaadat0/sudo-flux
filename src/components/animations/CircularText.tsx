import React, { useEffect } from "react";
import clsx from "clsx";
import {
    motion,
    useAnimation,
    useMotionValue,
    MotionValue,
} from "framer-motion";

interface CircularTextProps {
    text: string;
    spinDuration?: number;
    onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
    className?: string;
    letterClassName?: string;
    size?: number;
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
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
    letterClassName = "",
    size = 200,
}) => {
    const radius = size / 2.6;
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
        let transitionConfig: any;
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
                    scale: { type: "spring", damping: 20, stiffness: 300 },
                };
                controls.stop();
                controls.set({ rotate: start });
                controls.start({
                    scale: scaleVal,
                    transition: transitionConfig,
                });
                return;
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

    //   const circleLength = 2 * Math.PI * radius;
    const repeatedText = text;

    return (
        <div className="relative group rounded-full overflow-hidden border-3 border-sudo-blue-2">
            <div className="absolute bg-sudo-blue-2 w-16 h-16 group-hover:w-60 group-hover:h-60 transition-all duration-500 ease-in-out rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute p-10 border-3 border-sudo-blue-2 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="group-hover:text-sudo-white-2 transition-all duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 19L19 5M5 5h14v14" />
                    </svg>
                </div>
            </div>

            <motion.div
                className={clsx(
                    "m-0 mx-auto rounded-full relative font-black text-black group-hover:text-white transition-all duration-500  text-center cursor-pointer origin-center",
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
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <defs>
                        <path
                            id="circlePath"
                            d={`
                M ${size / 2},${size / 2}
                m -${radius},0
                a ${radius},${radius} 0 1,1 ${radius * 2},0
                a ${radius},${radius} 0 1,1 -${radius * 2},0
              `}
                            fill="currentColor"
                        />
                    </defs>
                    <text
                        className={clsx(
                            "absolute left-1/2 top-1/2 group-hover:text-sudo-white-2 transition-all duration-500",
                            letterClassName
                        )}
                        fontSize="10"
                        fontWeight="bold"
                    >
                        <textPath
                            href="#circlePath"
                            className="fill-black transition-all duration-500 group-hover:fill-white"
                            startOffset="0%"
                        >
                            {repeatedText}
                        </textPath>

                    </text>
                </svg>
            </motion.div>
        </div>
    );
};

export default CircularText;
