'use client'
import React from 'react';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CareerResponseType } from '@/hooks/careers.hooks';

interface CareersListSectionProps {
  careers: CareerResponseType[];
}

const CareersListSection: React.FC<CareersListSectionProps> = ({ careers }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'bg-green-100 text-green-600';
      case 'part_time':
        return 'bg-blue-100 text-blue-600';
      case 'contract':
        return 'bg-purple-100 text-purple-600';
      case 'internship':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'Full Time';
      case 'part_time':
        return 'Part Time';
      case 'contract':
        return 'Contract';
      case 'internship':
        return 'Internship';
      default:
        return type;
    }
  };

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-6">Open Positions</h4>
            <div className="w-2/4">
              <div className="h-1 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6 text-sudo-neutral-6">
            Current Job Openings
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-neutral-4 text-center max-w-3xl">
            Discover exciting career opportunities and join our team of talented professionals working on innovative projects.
          </p>
        </div>

        {/* Careers List */}
        {careers && careers.length > 0 ? (
          <div className="grid gap-6">
            {careers.map((career) => (
              <div
                key={career._id}
                className="group bg-sudo-white-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-sudo-white-3"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Side - Job Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-2 group-hover:text-sudo-purple-6 transition-colors">
                          {career.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-sudo-neutral-4">
                          {career.department && (
                            <div className="flex items-center gap-1">
                              <Briefcase size={16} />
                              <span>{career.department}</span>
                            </div>
                          )}
                          {career.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{career.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{getTypeLabel(career.type || 'full_time')}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getTypeColor(career.type || 'full_time')}`}
                      >
                        {getTypeLabel(career.type || 'full_time')}
                      </span>
                    </div>
                    
                    <div 
                      className="text-sudo-neutral-4 text-sm line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: career.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                      }}
                    />
                    
                    {/* Requirements Preview */}
                    {career.requirements && career.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {career.requirements.slice(0, 3).map((req, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-sudo-purple-1 text-sudo-purple-6 text-xs rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                        {career.requirements.length > 3 && (
                          <span className="px-2 py-1 bg-sudo-white-3 text-sudo-neutral-4 text-xs rounded-full">
                            +{career.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side - Apply Button */}
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        career.status === 'open'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {career.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                    
                    {career.status === 'open' && (
                      <Link href={`/careers/${career._id}`}>
                        <button className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-xl hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300 transform hover:scale-105">
                          <span className="font-medium">View Details</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sudo-purple-1 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase size={32} className="text-sudo-purple-6" />
            </div>
            <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-4">
              No Open Positions
            </h3>
            <p className="text-sudo-neutral-4 max-w-md mx-auto">
              We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals. 
              Feel free to send us your resume for future opportunities.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <button className="px-6 py-3 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-xl hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300">
                  Get In Touch
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-sudo-purple-1 to-sudo-blue-1 rounded-2xl p-8">
            <h3 className="text-sudo-header-28 font-bold text-sudo-neutral-6 mb-4">
              Don&apos;t See a Perfect Match?
            </h3>
            <p className="text-sudo-neutral-4 max-w-2xl mx-auto mb-6">
              We&apos;re always interested in hearing from talented individuals. Send us your resume and let us know how you&apos;d like to contribute to our team.
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-xl hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300 transform hover:scale-105">
                Send Us Your Resume
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersListSection;
