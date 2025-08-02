import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 5,
    className = '',
}) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`text-sudo-neutral-5 border px-6 py-2 rounded-full bg-clip-text inline-block ${!disabled ? 'animate-shine' : ''} ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(120deg, rgba(128, 90, 213, 0) 40%, rgba(99, 102, 241, 0.3) 50%, rgba(168, 85, 247, 0) 60%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animationDuration,
            }}
        >
            {text}
        </div>
    );
};

export default ShinyText;


// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };