// src/components/SampleCard.tsx
import React from 'react';
import Image from 'next/image';
import VerticalScroller from '@/components/animations/VerticalScroller';

interface SampleCardProps {
  imageUrl: string;
  title: string;
  text: string;
}

const SampleCard: React.FC<SampleCardProps> = ({ imageUrl, title, text }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100">
    <Image src={imageUrl} alt={title} width={300} height={150} className="w-full h-32 object-cover rounded-md mb-3" />
    <h3 className="font-bold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{text}</p>
  </div>
);


const Page = () => {
  return (
    <div className="min-h-screen p-10 mt-20 flex items-center justify-center ">

      {/* --- EXAMPLE 1: Default - Fading Top & Bottom --- */}
      <div className="w-80 h-[600px]  rounded-xl">
        <VerticalScroller direction="top" duration={30}>
          <div className="p-4"> {/* Add padding to content if cards don't have it */}
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card A" text="This is the first item." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card B" text="Scrolling seamlessly upwards." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card C" text="Fading at the edges." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card D" text="Using CSS Masks." />
          </div>
        </VerticalScroller>
      </div>
      <div className="w-80 h-[600px]  rounded-xl">
        <VerticalScroller direction="bottom" duration={30}>
          <div className="p-4"> {/* Add padding to content if cards don't have it */}
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card A" text="This is the first item." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card B" text="Scrolling seamlessly upwards." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card C" text="Fading at the edges." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card D" text="Using CSS Masks." />
          </div>
        </VerticalScroller>
      </div>
      <div className="w-80 h-[600px] rounded-xl">
        <VerticalScroller direction="top" duration={30}>
          <div className="p-4"> {/* Add padding to content if cards don't have it */}
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card A" text="This is the first item." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card B" text="Scrolling seamlessly upwards." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card C" text="Fading at the edges." />
            <SampleCard imageUrl="https://placehold.co/200x200/1e1e1e/FFFFFF/png?text=Your%5CnImage%5CnHere" title="Card D" text="Using CSS Masks." />
          </div>
        </VerticalScroller>
      </div>
    </div>
  );
};

export default Page;