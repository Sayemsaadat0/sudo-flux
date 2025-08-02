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
            className={`bg-sudo-neutral-5  rounded-full bg-clip-text inline-block ${!disabled ? 'animate-shine' : ''} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(128, 90, 213, 0) 40%, rgba(99, 102, 241, 0.9) 50%, rgba(168, 85, 247, 0.8) 60%)',

                backgroundSize: '200% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animationDuration: animationDuration,
            }}

        >

           <span className=' !text-amber-300'>✨</span>
            {text}
        </div>
    );
};

export default ShinyText;

