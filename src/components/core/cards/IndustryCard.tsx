
import React, { ReactNode, useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative">
      {/* Subtle glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />

      <div
        className="relative block bg-sudo-white-1 rounded-2xl shadow-lg border border-sudo-neutral-1 p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(href, '_blank')}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${gradient} transform rotate-12 translate-x-8 -translate-y-8 rounded-full`} />
        </div>

        {/* Header Section */}
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Beautiful Icon Container */}
            <div className={`relative p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <div className="text-sudo-white-1">
                {icon}
              </div>
              {/* Icon glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
            </div>

            <div>
              <h3 className="text-sudo-title-22 font-bold text-sudo-neutral-6 mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-sudo-neutral-5 group-hover:to-sudo-neutral-6">
                {title}
              </h3>
              <div className={`text-xs font-semibold text-sudo-neutral-6 px-3 py-1 bg-sudo-neutral-1 rounded-full inline-block transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${gradient} group-hover:text-sudo-white-1`}>

                {stats}
              </div>
            </div>
          </div>

          {/* Arrow Icon */}
          <div className={`flex -mt-1 -mx-1 h-10 w-10 items-center justify-center rounded-full bg-sudo-white-1 transition-all duration-500 ${isHovered ? 'bg-gradient-to-r ' + gradient + ' text-sudo-white-1 translate-x-1 -translate-y-1 scale-110' : 'text-sudo-neutral-4'}`}>
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>

        {/* Description */}
        <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-32' : 'max-h-20'}`}>
          <p className="text-sudo-neutral-5 leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;