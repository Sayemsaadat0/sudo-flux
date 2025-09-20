// src/components/sections/IndustryWeServe.tsx
import React from 'react';
import Link from 'next/link';
import VerticalScroller from '@/components/animations/VerticalScroller';
import IndustryCard from '@/components/core/cards/IndustryCard';
import { ArrowRight, Building } from 'lucide-react';

import LineAnimation from '../animations/LineAnimation';
import Button from '../ui/button';

// Basic shape from model
type IndustryItem = {
  _id: string;
  title: string;
  description: string;
  publish?: boolean;
};

// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-'); // Unused function

interface IndustryWeServeProps {
  industries: IndustryItem[];
}

// Your business deserves to be seen, understood, and remembered
const IndustryWeServe: React.FC<IndustryWeServeProps> = ({ industries }) => {
  const cards = industries.map((item) => ({
    icon: <Building className="h-6 w-6" />,
    title: item.title,
    description: item.description,
    href: `#`,
    gradient: 'from-sudo-blue-4 to-sudo-purple-6',
  }));

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-4">
            <div>
              <h4 className="uppercase font-bold text-sm sm:text-base">What We Build</h4>
              <div className="w-[100px]">
                <LineAnimation />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-title-48 md:leading-[60px] text-sudo-neutral-6 font-heading leading-tight">
              Your business deserves to be seen, understood, and remembered
            </h2>
            <p className='text-sm sm:text-base lg:text-sudo-paragraph-20 leading-relaxed'>
              We dig deeper than most, because we know your digital presence should reflect what sets you apart in your field.
            </p>
            <Link href={'/quote'}>
              <Button
                icon={<ArrowRight size={'16'} className="sm:w-[18px] sm:h-[18px]" />}
                icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100"
                className="text-sudo-white-2 w-fit"
                label="Contact Us"
                size="md"
              />
            </Link>
          </div>

          {/* Cards Container - Different layouts for different screen sizes */}
          <div className="relative w-full">
            {/* Simple Grid Layout for Small and Medium Devices */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {cards.map((card, index) => (
                  <IndustryCard key={index} {...card} />
                ))}
              </div>
            </div>

            {/* Vertical Scroller for Large Devices */}
            <div className="hidden lg:block relative h-[600px] w-full">
              <VerticalScroller duration={10} pauseOnHover>
                <div className="p-4 space-y-4">
                  {/* Map over your data to create the cards */}
                  {cards.map((card, index) => (
                    <IndustryCard key={index} {...card} />
                  ))}
                </div>
              </VerticalScroller>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryWeServe;