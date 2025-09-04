'use client';

import Image from 'next/image';
import { QuoteIcon } from 'lucide-react';
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
    <div className="group bg-sudo-white-1 text-left p-8 max-w-80 min-h-[420px] rounded-2xl shadow-sm hover:shadow-lg flex flex-col justify-between space-y-6 border border-sudo-white-2 transition-all duration-300">
      <div className='space-y-6'>
        {/* Quote Icon */}
        <div className="transition-all duration-300 group-hover:scale-110">
          <QuoteIcon className={clsx('w-12 h-12', quoteColor)} />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sudo-title-22 font-heading line-clamp-2 transition-all duration-300 group-hover:text-sudo-blue-6">
          {title}
        </h3>

        {/* Feedback */}
        <p className="text-sudo-neutral-5 leading-relaxed line-clamp-6 transition-all duration-300 group-hover:text-sudo-neutral-6">
          {feedback}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-sudo-white-2">
        <div className="relative">
          <Image
            src={author.image}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full object-cover transition-all duration-300 group-hover:ring-2 group-hover:ring-sudo-blue-6/20"
          />
        </div>
        <div>
          <div className="font-bold font-heading text-sudo-neutral-6 transition-all duration-300 group-hover:text-sudo-blue-6">
            {author.name}
          </div>
          <div className="text-sudo-neutral-4 text-sm transition-all duration-300 group-hover:text-sudo-neutral-5">
            {author.role}
          </div>
        </div>
      </div>
    </div>
  );
};
