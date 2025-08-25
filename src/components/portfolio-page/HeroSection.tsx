import React from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, Play, Star } from 'lucide-react';
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

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-16 border-t border-sudo-neutral-4">
            <div className="space-y-4">
              <div className="text-3xl font-bold text-sudo-purple-3">200+</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Projects Completed</div>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-sudo-blue-3">50+</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-sudo-purple-3">8+</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-1">
                <div className="text-3xl font-bold text-sudo-blue-3">4.9</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-sudo-purple-3 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
