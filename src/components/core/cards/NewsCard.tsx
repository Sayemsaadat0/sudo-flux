// src/components/NewsCard_Overlay.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import AnimatedImage from '@/components/animations/AnimatedImage';

// --- PROPS INTERFACE ---
interface NewsCardProps {
  thumbnailUrl: string;
  category: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}

// --- COMPONENT ---
const NewsCard: React.FC<NewsCardProps> = ({
  thumbnailUrl,
  category,
  title,
  description,
  link,
  className,
}) => {
  return (
    <Link
      href={link}
      className={clsx(
        'group relative block h-full min-h-[400px] overflow-hidden rounded-2xl shadow-sm',
        'transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      {/* Background Image */}
      <AnimatedImage
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:brightness-110"
        src={thumbnailUrl}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={title}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
      />

      {/* Gradient Overlay for Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50"
        aria-hidden="true"
      />

      {/* Text Content */}
      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        <div className="transition-all duration-300">
            {/* Category */}
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-300 transition-all duration-300 group-hover:text-indigo-200">
                {category}
            </p>
            
            {/* Title */}
            <h3 className="text-2xl font-bold leading-tight transition-all duration-300 group-hover:text-sky-100">
                {title}
            </h3>

            {/* Description */}
            <div className="mt-4 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-20">
                <p className="text-gray-200 line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;