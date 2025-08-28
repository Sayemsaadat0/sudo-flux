import React from 'react';
import { Calendar, Building } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description: "Leading frontend development for enterprise applications."
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Innovations Ltd",
      period: "2020 - 2022",
      description: "Developed full-stack web applications using modern technologies."
    },
    {
      title: "Junior Developer",
      company: "StartupHub",
      period: "2019 - 2020",
      description: "Started career in web development, learning modern frameworks."
    }
  ];

  return (
    <section className="bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div>
                <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-purple-3">
                  Work Experience
                </h4>
                <div className="w-[100px] mx-auto">
                  <LineAnimation />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight">
              Professional
              <span className="gradient-text-static block">Journey</span>
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={index} className="bg-sudo-neutral-5 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-sudo-white-1">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sudo-white-4">
                      <Building size={16} />
                      <span>{experience.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sudo-purple-3">
                    <Calendar size={16} />
                    <span className="font-medium">{experience.period}</span>
                  </div>
                </div>
                
                <p className="text-sudo-white-4">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
