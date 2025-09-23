import React from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, ExternalLink, Eye } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ProjectsSection = () => {
  const projects = [
    {
      title: "TechCorp E-commerce Platform",
      client: "TechCorp Solutions",
      description: "A comprehensive e-commerce platform with advanced inventory management, payment processing, and analytics dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      category: "E-commerce",
      featured: true,
      liveUrl: "#",
      caseStudyUrl: "#"
    },
    {
      title: "FinFlow Banking App",
      client: "FinFlow Bank",
      description: "Modern mobile banking application with real-time transactions, biometric security, and investment tracking",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React Native", "Node.js", "AWS", "Blockchain"],
      category: "FinTech",
      featured: true,
      liveUrl: "#",
      caseStudyUrl: "#"
    },
    {
      title: "HealthTech Dashboard",
      client: "MediCare Systems",
      description: "Healthcare management system with patient records, appointment scheduling, and telemedicine features",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["React", "Python", "PostgreSQL", "HIPAA"],
      category: "Healthcare",
      featured: true,
      liveUrl: "#",
      caseStudyUrl: "#"
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
                  Our Portfolio
                </h4>
                <div className="w-[100px] mx-auto">
                  <LineAnimation />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight">
              Success Stories
              <span className="gradient-text-static block">That Inspire</span>
            </h2>
            <p className="text-sudo-paragraph-20 text-sudo-white-4 leading-relaxed max-w-2xl mx-auto">
              Discover how we&apos;ve helped businesses transform their digital presence and achieve remarkable results.
            </p>
          </div>

          <div className="space-y-16">
            {projects.filter(p => p.featured).map((project, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Project Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-video bg-gradient-to-br from-sudo-purple-5 to-sudo-blue-5 rounded-2xl p-1">
                    <div className="w-full h-full bg-sudo-neutral-5 rounded-xl overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-sudo-purple-3 to-sudo-blue-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sudo-white-1 text-lg font-medium mb-2">{project.title}</div>
                          <div className="text-sudo-white-3 text-sm">{project.client}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Overlay with links */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button 
                      icon={<ExternalLink size={16} />} 
                      icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5" 
                      className="text-sudo-white-1" 
                      label="Live Demo"
                      size="sm"
                    />
                    <Button 
                      icon={<Eye size={16} />} 
                      icon_style="border border-sudo-blue-3 text-sudo-blue-3 bg-sudo-neutral-5" 
                      className="text-sudo-white-1" 
                      label="Case Study"
                      variant="outlineBtn"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Project Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-sudo-purple-5 text-sudo-purple-3 text-xs rounded-full uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="text-sudo-white-4 text-sm">Client: {project.client}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-sudo-white-1">
                      {project.title}
                    </h3>
                    <p className="text-sudo-paragraph-20 text-sudo-white-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-sudo-neutral-5 text-sudo-purple-3 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      icon={<ExternalLink size={16} />} 
                      icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5" 
                      className="text-sudo-white-1" 
                      label="View Project"
                      size="md"
                    />
                    <Button 
                      icon={<Eye size={16} />} 
                      icon_style="border border-sudo-blue-3 text-sudo-blue-3 bg-sudo-neutral-5" 
                      className="text-sudo-white-1" 
                      label="Read Case Study"
                      variant="outlineBtn"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button 
              icon={<ArrowRight size={16} />} 
              icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-neutral-5" 
              className="text-sudo-white-1" 
              label="View All Projects"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
