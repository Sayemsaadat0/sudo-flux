'use client';

import React from 'react';
import { useGetActiveLegal } from '@/hooks/legal.hooks';
import { Scale, Calendar, FileText, Loader2 } from 'lucide-react';

const TermsConditionsPage = () => {
  const { data: legalResponse, isLoading, error } = useGetActiveLegal('terms');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sudo-white-1">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sudo-blue-6 mx-auto mb-4" />
          <p className="text-sudo-neutral-4">Loading Terms & Conditions...</p>
        </div>
      </div>
    );
  }

  if (error || legalResponse?.results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sudo-white-1">
        <div className="text-center max-w-md mx-auto px-4">
          <Scale className="w-16 h-16 text-sudo-neutral-4 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-sudo-neutral-6 mb-2">Terms & Conditions</h1>
          <p className="text-sudo-neutral-4">
            Our terms and conditions are currently being updated. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  const termsConditions = legalResponse?.results[0];

  return (
    <div className="min-h-screen mt-20 bg-sudo-white-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-sudo-white-2 text-lg">
            Please read these terms and conditions carefully before using our services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-sudo-white-3 p-8">
          {/* Document Info */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-sudo-white-3">
            <div className="w-12 h-12 rounded-full bg-sudo-purple-1 flex items-center justify-center">
              <FileText className="w-6 h-6 text-sudo-purple-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-sudo-neutral-6">{termsConditions.title}</h2>
              <div className="flex items-center gap-4 text-sm text-sudo-neutral-4 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Version {termsConditions.version}
                </span>
                <span>
                  Last updated: {new Date(termsConditions.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div 
            className="prose prose-lg max-w-none text-sudo-neutral-6"
            dangerouslySetInnerHTML={{ __html: termsConditions.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
