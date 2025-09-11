import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sudo-white-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-sudo-purple-1 rounded-full flex items-center justify-center mx-auto mb-6">
          <Briefcase size={48} className="text-sudo-purple-6" />
        </div>
        
        <h1 className="text-6xl font-bold text-sudo-neutral-6 mb-4">404</h1>
        <h2 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-4">
          Career Position Not Found
        </h2>
        <p className="text-sudo-neutral-4 max-w-md mx-auto mb-8">
          The career position you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-xl hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            <span>Back to Careers</span>
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-sudo-white-3 text-sudo-neutral-6 rounded-xl hover:bg-sudo-white-2 transition-all duration-300"
          >
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
