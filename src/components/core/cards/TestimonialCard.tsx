'use client';

import Image from 'next/image';
import {  QuoteIcon } from 'lucide-react';
import clsx from 'clsx';

interface TestimonialCardProps {
  quoteColor?: string;
  title: string;
  feedback: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

export const TestimonialCard = ({
  quoteColor = 'text-sudo-purple-6',
  title,
  feedback,
  author,
}: TestimonialCardProps) => {
  return (
    <div className="bg-sudo-white-1 text-left p-6 max-w-80 h-96 rounded-xl shadow-md  space-y-4 border  border-gray-200">
      {/* Quote Icon */}
      <QuoteIcon  className={clsx('w-12 h-12', quoteColor)} />

      {/* Title */}
      <h3 className="font-semibold  text-sudo-title-22 font-heading line-clamp-2">{title}</h3>

      {/* Feedback */}
      <p className="text-gray-600  leading-relaxed line-clamp-6">{feedback}</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4">
        <Image
          src={author.image}
          alt={author.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <div className="font-bold font-heading ">{author.name}</div>
          <div className="text-gray-500 text-sm">{author.role}</div>
        </div>
      </div>
    </div>
  );
};
