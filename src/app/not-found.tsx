'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-sudo-white-1 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-sudo-red-1 to-sudo-orange-1 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-sudo-red-6" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sudo-red-6 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-sudo-neutral-6 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-sudo-neutral-6 mb-4">Page Not Found</h2>
          <p className="text-lg text-sudo-neutral-4 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/">
            <Button 
              label="Go Home" 
              variant="primarybtn"
              className="flex items-center gap-2 px-6 py-3"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-sudo-white-3 text-sudo-neutral-6 rounded-lg hover:bg-sudo-white-4 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-sudo-white-2 rounded-xl p-6 border border-sudo-white-3">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-sudo-blue-6" />
            <h3 className="text-lg font-semibold text-sudo-neutral-6">Looking for something specific?</h3>
          </div>
          <p className="text-sudo-neutral-4 mb-4">
            Try searching for what you need or browse our popular pages:
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Link 
              href="/about" 
              className="px-3 py-1 bg-sudo-blue-1 text-sudo-blue-7 rounded-full text-sm hover:bg-sudo-blue-2 transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/service" 
              className="px-3 py-1 bg-sudo-purple-1 text-sudo-purple-7 rounded-full text-sm hover:bg-sudo-purple-2 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/portfolio" 
              className="px-3 py-1 bg-sudo-green-1 text-sudo-green-7 rounded-full text-sm hover:bg-sudo-green-2 transition-colors"
            >
              Portfolio
            </Link>
            <Link 
              href="/contact" 
              className="px-3 py-1 bg-sudo-orange-1 text-sudo-orange-7 rounded-full text-sm hover:bg-sudo-orange-2 transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/blogs" 
              className="px-3 py-1 bg-sudo-pink-1 text-sudo-pink-7 rounded-full text-sm hover:bg-sudo-pink-2 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-sudo-neutral-4">
          <p>
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-sudo-blue-6 hover:text-sudo-blue-7 underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
