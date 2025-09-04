
import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface IndustryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  gradient?: string;
  stats?: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({
  icon,
  title,
  description,
  href,
  gradient = "from-sudo-blue-4 to-sudo-purple-6",
  stats = "120+ Companies"
}) => {
  return (
    <div className="group relative">
      {/* Subtle glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />

      <div
        className="relative block bg-sudo-white-1 rounded-2xl shadow-sm border border-sudo-neutral-1 p-8 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
        onClick={() => window.open(href, '_blank')}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${gradient} transform rotate-12 translate-x-8 -translate-y-8 rounded-full`} />
        </div>

        {/* Header Section */}
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Icon Container */}
            <div className={`relative p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md`}>
              <div className="text-sudo-white-1 transition-all duration-300 group-hover:scale-105">
                {icon}
              </div>
            </div>

            <div>
              <h3 className="text-sudo-title-22 font-bold text-sudo-neutral-6 mb-2 transition-all duration-300 group-hover:text-sudo-blue-6">
                {title}
              </h3>
              <div className={`text-xs font-semibold text-sudo-neutral-6 px-3 py-1 bg-sudo-neutral-1 rounded-full inline-block transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:text-sudo-white-1`}>
                {stats}
              </div>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className={`flex -mt-1 -mx-1 h-10 w-10 items-center justify-center rounded-full bg-sudo-white-1 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:text-sudo-white-1 text-sudo-neutral-4`}>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Description */}
        <div className="overflow-hidden">
          <p className="text-sudo-neutral-5 leading-relaxed text-sm transition-all duration-300 group-hover:text-sudo-neutral-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;