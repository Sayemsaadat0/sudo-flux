'use client'
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is included in the free consultation?",
      answer: "Our free consultation includes a detailed project analysis, technology recommendations, budget estimation, timeline planning, and a comprehensive roadmap for your project. You'll also receive expert advice on best practices and potential challenges."
    },
    {
      question: "How long does the consultation take?",
      answer: "The consultation typically takes 30-45 minutes. This gives us enough time to understand your requirements, discuss your goals, and provide you with valuable insights and recommendations for your project."
    },
    {
      question: "Is the consultation really free?",
      answer: "Yes, absolutely! Our consultation is completely free with no hidden costs or obligations. We believe in providing value upfront and helping you make informed decisions about your project."
    },
    {
      question: "What information should I prepare for the consultation?",
      answer: "Please prepare details about your project goals, target audience, desired features, budget range, timeline expectations, and any specific requirements. The more information you provide, the better we can assist you."
    },
    {
      question: "Do I need to commit to working with you after the consultation?",
      answer: "No, there's no obligation to work with us after the consultation. Our goal is to provide you with valuable insights and help you make the best decision for your project, whether that's with us or another provider."
    },
    {
      question: "Can I get a written proposal after the consultation?",
      answer: "Yes! After the consultation, we can provide you with a detailed written proposal including project scope, timeline, budget breakdown, and next steps. This proposal is also provided at no cost."
    },
    {
      question: "What types of projects do you consult on?",
      answer: "We consult on a wide range of digital projects including web development, mobile apps, e-commerce solutions, UI/UX design, digital marketing strategies, and system integrations. No project is too big or too small."
    },
    {
      question: "How quickly can I schedule a consultation?",
      answer: "We typically respond to consultation requests within 24 hours and can usually schedule a consultation within 2-3 business days. For urgent projects, we can often accommodate same-day or next-day consultations."
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
            Consultation Frequently Asked Questions
          </h2>
          <p className="text-sudo-paragraph-20 text-sudo-neutral-4 text-center max-w-3xl">
            Find answers to common questions about our free consultation process and what you can expect.
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
            <h3 className="text-sudo-header-28 font-bold mb-4 text-sudo-neutral-6">Ready for Your Free Consultation?</h3>
            <p className="text-sudo-neutral-4 mb-6">
              Don&apos;t wait! Schedule your free consultation today and get expert insights for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#consultation-form" className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-sudo-white-1 px-8 py-3 rounded-full font-semibold hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all duration-300 transform hover:scale-105">
                Request Consultation
              </a>
              <a href="tel:+15551234567" className="border border-sudo-purple-6 text-sudo-purple-6 px-8 py-3 rounded-full font-semibold hover:bg-sudo-purple-6 hover:text-sudo-white-1 transition-all duration-300">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
