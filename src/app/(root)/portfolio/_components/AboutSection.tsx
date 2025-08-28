import React from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const AboutSection = () => {
  const skills = [
    { icon: <Code size={24} />, title: "Full-Stack Development", description: "React, Next.js, Node.js, TypeScript" },
    { icon: <Palette size={24} />, title: "UI/UX Design", description: "Figma, Adobe Creative Suite, Prototyping" },
    { icon: <Zap size={24} />, title: "Performance Optimization", description: "Web Vitals, SEO, Analytics" }
  ];

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-sudo-purple-3 to-sudo-blue-5 rounded-3xl p-8">
              <div className="w-full h-full bg-sudo-white-1 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-full flex items-center justify-center mx-auto">
                    <Code size={32} className="text-sudo-white-1" />
                  </div>
                  <h3 className="text-xl font-bold text-sudo-neutral-6">Creative Developer</h3>
                  <p className="text-sudo-neutral-4">Passionate about creating meaningful digital experiences</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-purple-6">
                  About Me
                </h4>
                <div className="w-[100px]">
                  <LineAnimation />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight text-sudo-neutral-6">
                Turning Ideas Into
                <span className="gradient-text-static block">Digital Reality</span>
              </h2>
            </div>
            
            <p className="text-sudo-paragraph-20 text-sudo-neutral-4 leading-relaxed">
              I&apos;m a passionate developer and designer with over 5 years of experience creating 
              exceptional digital experiences. I believe in the power of clean code, beautiful design, 
              and user-centered thinking to solve complex problems.
            </p>
            
            <p className="text-sudo-paragraph-20 text-sudo-neutral-4 leading-relaxed">
              My approach combines technical expertise with creative problem-solving, ensuring 
              every project not only meets but exceeds expectations.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {skills.map((skill, index) => (
                <div key={index} className="p-4 bg-sudo-white-2 rounded-xl text-center">
                  <div className="text-sudo-purple-5 mb-2 flex justify-center">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-sudo-neutral-6 text-sm">{skill.title}</h4>
                  <p className="text-xs text-sudo-neutral-4 mt-1">{skill.description}</p>
                </div>
              ))}
            </div>

            <Button 
              icon={<ArrowRight size={16} />} 
              icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-white-2" 
              className="text-sudo-neutral-6 w-fit" 
              label="Learn More"
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
