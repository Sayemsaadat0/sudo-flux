import React from 'react';
import { Code, Database, Palette } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "text-sudo-purple-6"
    },
    {
      icon: <Database size={32} />,
      title: "Backend Development",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      color: "text-sudo-blue-6"
    },
    {
      icon: <Palette size={32} />,
      title: "Design & UI/UX",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping"],
      color: "text-sudo-purple-6"
    }
  ];

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div>
                <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-purple-6">
                  Technical Skills
                </h4>
                <div className="w-[100px] mx-auto">
                  <LineAnimation />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight text-sudo-neutral-6">
              Skills That
              <span className="gradient-text-static block">Drive Innovation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-sudo-white-2 rounded-2xl p-6 space-y-4">
                <div className={`${category.color} mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-sudo-neutral-6">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-sudo-white-3 text-sudo-neutral-5 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
