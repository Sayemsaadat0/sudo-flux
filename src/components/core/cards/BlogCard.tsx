'use client';

import React from 'react';
import clsx from 'clsx';
import AnimatedImage from '@/components/animations/AnimatedImage';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    thumbnailUrl: string;
    title: string;
    description: string;
    link: string;
    category: string;
    date: string;
    readTime: string;
    author?: string;
    className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    thumbnailUrl,
    title,
    description,
    link,
    category,
    date,
    readTime,
    author,
    className,
}) => {
    return (
        <Link
            href={link}
            className={clsx(
                'group block w-full rounded-2xl bg-sudo-white-1 border border-sudo-white-2 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1',
                className
            )}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <AnimatedImage
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src={thumbnailUrl}
                    width={550}
                    height={220}
                    alt={title}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-sudo-blue-6 text-white text-xs font-semibold rounded-full">
                        {category}
                    </span>
                </div>
            </div>

            {/* Text Content */}
            <div className="px-6 py-6 flex flex-col gap-4">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs text-sudo-neutral-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{readTime}</span>
                    </div>
                </div>

                {/* Title */}
                <h2
                    className="text-xl sm:text-2xl font-bold text-sudo-neutral-6 line-clamp-2 leading-tight group-hover:text-sudo-blue-6 transition-colors duration-300"
                    title={title}
                >
                    {title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-sudo-neutral-5 line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {/* Author (if provided) */}
                {author && (
                    <div className="text-sm text-sudo-neutral-4">
                        <span className="font-medium">By {author}</span>
                    </div>
                )}

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-sudo-blue-6 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
