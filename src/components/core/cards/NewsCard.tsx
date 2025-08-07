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
        'group relative block h-full min-h-[400px] overflow-hidden rounded-2xl shadow-lg',
        'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        className
      )}
    >
      {/* 1. Background Image */}
      <AnimatedImage
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        src={thumbnailUrl}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={title}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
      />

      {/* 2. Gradient Overlay for Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        aria-hidden="true"
      />

      {/* 3. Text Content */}
      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        <div className="transition-transform duration-300 group-hover:-translate-y-2">
            {/* Category */}
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-300">
                {category}
            </p>
            
            {/* Title */}
            <h3 className="text-2xl font-bold leading-tight">
                {title}
            </h3>

            {/* Description (shows on hover) */}
            <div className="mt-4 h-0 opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100">
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