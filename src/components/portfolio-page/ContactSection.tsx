import React from 'react';
import Button from '@/components/ui/button';
import { Mail, Phone, MapPin, ArrowRight, Clock } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const ContactSection = () => {
  return (
    <section className="bg-sudo-white-1 py-20 sm:py-24 lg:py-32">
      <div className="sudo-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="uppercase font-bold text-sm sm:text-base text-sudo-purple-6">
                  Start Your Project
                </h4>
                <div className="w-[100px]">
                  <LineAnimation />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight text-sudo-neutral-6">
                Ready to
                <span className="gradient-text-static block">Transform Your Business?</span>
              </h2>
            </div>
            
            <p className="text-sudo-paragraph-20 text-sudo-neutral-4 leading-relaxed">
              Let&apos;s discuss how we can help you achieve your digital goals. Our team is ready to bring your vision to life.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-sudo-purple-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-neutral-6">Email Us</h4>
                  <p className="text-sudo-neutral-4">hello@company.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sudo-blue-1 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-sudo-blue-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-neutral-6">Call Us</h4>
                  <p className="text-sudo-neutral-4">+44 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-sudo-purple-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-neutral-6">Visit Us</h4>
                  <p className="text-sudo-neutral-4">London, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sudo-blue-1 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-sudo-blue-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sudo-neutral-6">Business Hours</h4>
                  <p className="text-sudo-neutral-4">Mon-Fri: 9AM-6PM GMT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sudo-white-2 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-sudo-neutral-6">
                Get a Free Quote
              </h3>
              <p className="text-sudo-neutral-4 text-sm">
                Tell us about your project and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-sudo-white-1 rounded-xl border border-sudo-white-3 focus:outline-none focus:border-sudo-purple-3"
                />
                <input 
                  type="text" 
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-sudo-white-1 rounded-xl border border-sudo-white-3 focus:outline-none focus:border-sudo-purple-3"
                />
              </div>
              
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-sudo-white-1 rounded-xl border border-sudo-white-3 focus:outline-none focus:border-sudo-purple-3"
              />

              <input 
                type="text" 
                placeholder="Company Name"
                className="w-full px-4 py-3 bg-sudo-white-1 rounded-xl border border-sudo-white-3 focus:outline-none focus:border-sudo-purple-3"
              />
              
              <textarea 
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-4 py-3 bg-sudo-white-1 rounded-xl border border-sudo-white-3 focus:outline-none focus:border-sudo-purple-3 resize-none"
              />
              
              <Button 
                icon={<ArrowRight size={16} />} 
                icon_style="border border-sudo-purple-3 text-sudo-purple-3 bg-sudo-white-1" 
                className="text-sudo-neutral-6 w-full" 
                label="Send Message"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
