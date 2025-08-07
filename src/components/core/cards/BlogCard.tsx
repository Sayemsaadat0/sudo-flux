'use client'
// src/components/BlogCard.tsx
import React from 'react';
import clsx from 'clsx';
import AnimatedImage from '@/components/animations/AnimatedImage';

interface BlogCardProps {
    thumbnailUrl: string;
    title: string;
    description: string;
    link: string;
    className?: string; // To allow for additional custom styling
}

const BlogCard: React.FC<BlogCardProps> = ({
    thumbnailUrl,
    title,
    description,
    link,
    className,
}) => {
    return (
        // The entire card is a link for better accessibility and UX
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                'block w-full max-w-md ',
                className // Allows for passing extra classes
            )}
        >
            {/* 1. THUMBNAIL CONTAINER with 3/4 aspect ratio */}
            <div className=" rounded-md mb-4">
                <AnimatedImage
                    className="max-w-md  max-h-[200px]  rounded-lg"
                    src={thumbnailUrl}
                    width={550}
                    height={220}
                    objectFit="cover"
                    alt="header-img"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                />
            </div>

            {/* 2. TEXT CONTENT */}
            <div className="flex flex-col">
                <h2
                    className="text-sudo-title-22 font-bold text-sudo-neutral-6 line-clamp-2"
                    title={title} // Show full title on hover
                >
                    {title}
                </h2>
                <p className="mt-2  text-sudo-neutral-5 line-clamp-6">
                    {description}
                </p>
            </div>
        </a>
    );
};

export default BlogCard;