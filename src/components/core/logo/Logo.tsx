// 'use client';
import Image from 'next/image';
import React from 'react';


const Logo = () => {
  return (
    <div className='w-[110px] md:w-[130px] '>
      <Image
        className="object-cover w-full"
        src={'/logo/logo-black.png'}
        // src={'/logo/logo.png'}
        alt="Logo"
        width={209}
        height={150}
        priority
      />
    </div>
  );
};

export default Logo;
