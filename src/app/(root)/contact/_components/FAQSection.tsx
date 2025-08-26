'use client'
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, e-commerce solutions, digital marketing, and cloud infrastructure. Our team specializes in creating custom digital solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex e-commerce platform could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and depends on the scope, complexity, and requirements. We offer transparent pricing with detailed proposals that break down all costs. We also provide flexible payment plans and can work within various budgets."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer comprehensive post-launch support including maintenance, updates, bug fixes, and performance monitoring. We also provide training and documentation to help your team manage the solution effectively."
    },
    {
      question: "Can you work with existing systems?",
      answer: "Absolutely! We have extensive experience integrating with existing systems and platforms. We can work with your current infrastructure, APIs, databases, and third-party services to ensure seamless integration."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, PHP, and various cloud platforms. We choose the best technology stack for each project based on requirements, scalability, and performance needs."
    },
    {
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices including code reviews, testing protocols, and quality assurance processes. Our team includes experienced developers, designers, and project managers who ensure every project meets our high standards."
    },
    {
      question: "Do you provide hosting and domain services?",
      answer: "Yes, we offer complete hosting and domain management services. We can set up reliable hosting infrastructure, manage domains, SSL certificates, and provide ongoing maintenance to ensure your website or application runs smoothly."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
            <h4 className="uppercase font-bold text-sudo-purple-6">FAQ</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6 text-sudo-neutral-6">
            Frequently Asked Questions
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-neutral-4 text-center max-w-3xl">
            Find answers to common questions about our services, process, and what you can expect when working with us.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="group bg-sudo-white-2 rounded-2xl border border-sudo-white-3 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-sudo-white-3 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 rounded-xl flex items-center justify-center">
                      <HelpCircle size={20} className="text-sudo-white-1" />
                    </div>
                    <h3 className="text-sudo-header-20 font-bold text-sudo-neutral-6 group-hover:text-sudo-purple-6 transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-sudo-neutral-4 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-sudo-neutral-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-sudo-white-2 rounded-3xl p-8 max-w-2xl mx-auto border border-sudo-white-3">
            <h3 className="text-sudo-header-28 font-bold mb-4 text-sudo-neutral-6">Still Have Questions?</h3>
            <p className="text-sudo-neutral-4 mb-6">
              Can&apos;t find what you&apos;re looking for? Our team is here to help. Get in touch with us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-sudo-white-1 px-8 py-3 rounded-full font-semibold hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
              <button className="border border-sudo-purple-6 text-sudo-purple-6 px-8 py-3 rounded-full font-semibold hover:bg-sudo-purple-6 hover:text-sudo-white-1 transition-all duration-300">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
