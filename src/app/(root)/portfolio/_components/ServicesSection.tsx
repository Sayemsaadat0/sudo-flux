import React from 'react';
import Button from '@/components/ui/button';
import { ArrowRight, Code, Palette, Smartphone, Zap, Database, Globe } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ServicesSection = () => {
  const services = [
    {
      icon: <Code size={32} />,
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices",
      features: ["React & Next.js", "Node.js Backend", "API Development", "Performance Optimization"],
      color: "text-sudo-purple-6"
    },
    {
      icon: <Palette size={32} />,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience and drive engagement",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "text-sudo-blue-6"
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Native iOS/Android", "PWA Development", "App Store Optimization"],
      color: "text-sudo-purple-6"
    },
    {
      icon: <Database size={32} />,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms that drive sales and enhance customer experience",
      features: ["Shopify Development", "Custom Platforms", "Payment Integration", "Inventory Management"],
      color: "text-sudo-blue-6"
    },
    {
      icon: <Zap size={32} />,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns that increase brand visibility and conversions",
      features: ["SEO Optimization", "PPC Campaigns", "Social Media", "Content Marketing"],
      color: "text-sudo-purple-6"
    },
    {
      icon: <Globe size={32} />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and DevOps solutions for modern businesses",
      features: ["AWS/Azure Setup", "CI/CD Pipelines", "Server Management", "Security & Monitoring"],
      color: "text-sudo-blue-6"
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
                  Our Services
                </h4>
                <div className="w-[100px] mx-auto">
                  <LineAnimation />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight text-sudo-neutral-6">
              Comprehensive
              <span className="gradient-text-static block">Digital Solutions</span>
            </h2>
            <p className="text-sudo-paragraph-20 text-sudo-neutral-4 leading-relaxed max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end digital solutions that help businesses 
              thrive in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-sudo-white-2 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-all duration-300 group">
                <div className={`${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-sudo-neutral-6">
                  {service.title}
                </h3>
                <p className="text-sudo-neutral-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-sudo-neutral-5">
                      <div className="w-1.5 h-1.5 bg-sudo-purple-4 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button 
              icon={<ArrowRight size={16} />} 
              icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-white-2" 
              className="text-sudo-neutral-6 w-fit" 
              label="Explore All Services"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
