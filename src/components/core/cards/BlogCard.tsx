'use client';

import React from 'react';
import clsx from 'clsx';
import AnimatedImage from '@/components/animations/AnimatedImage';
import Link from 'next/link';

interface BlogCardProps {
    thumbnailUrl: string;
    title: string;
    description: string;
    link: string;
    className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    thumbnailUrl,
    title,
    description,
    link,
    className,
}) => {
    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                'group block w-full rounded-2xl bg-sudo-white-1 border border-sudo-white-2 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden',
                className
            )}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <AnimatedImage
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    src={thumbnailUrl}
                    width={550}
                    height={220}
                    alt="Blog Thumbnail"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                />
            </div>

            {/* Text Content */}
            <div className="px-5 py-4 flex flex-col gap-2">
                <h2
                    className="text-lg sm:text-xl font-semibold text-sudo-neutral-6 line-clamp-2 leading-snug group-hover:text-sudo-neutral-7 transition-colors"
                    title={title}
                >
                    {title}
                </h2>
                <p className="text-sm text-sudo-neutral-5 line-clamp-4 leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default BlogCard;
