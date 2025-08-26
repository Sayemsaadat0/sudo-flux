import React from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
// import LineAnimation from '@/components/animations/LineAnimation';

const HeroSection = () => {
  return (
    <section className="bg-sudo-neutral-6 text-sudo-white-1 py-32 sm:py-40 lg:py-48">
      <div className="sudo-container">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Subtitle */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-sudo-neutral-5 rounded-full border border-sudo-neutral-4">
                <div className="w-2 h-2 bg-sudo-purple-3 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-sudo-white-3 uppercase tracking-wider">
                  Award-winning digital agency
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-sudo-header-88 font-heading leading-tight">
                We Build
                <span className="gradient-text-static block">Digital Products</span>
                That Scale
              </h1>
              <p className="text-xl sm:text-2xl text-sudo-white-3 leading-relaxed max-w-3xl mx-auto font-light">
                Transforming businesses through innovative web development, cutting-edge design, and strategic digital solutions
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                icon={<ArrowRight size={18} />} 
                icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5" 
                className="text-sudo-white-1 w-fit" 
                label="View Our Work"
                size="lg"
              />
              <Button 
                icon={<Play size={18} />} 
                icon_style="border border-sudo-white-3 text-sudo-white-3 bg-transparent" 
                className="text-sudo-white-1 w-fit" 
                label="Watch Showreel"
                variant="outlineBtn"
                size="lg"
              />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;
