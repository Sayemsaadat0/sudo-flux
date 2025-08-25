import React from 'react';
import { Star, Quote } from 'lucide-react';
import LineAnimation from '@/components/animations/LineAnimation';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechCorp Solutions",
      content: "Working with this team was an absolute pleasure. They delivered our e-commerce platform on time and exceeded our expectations. The attention to detail and user experience is outstanding.",
      rating: 5,
      image: "/images/Banner.png"
    },
    {
      name: "Michael Chen",
      position: "CTO",
      company: "FinFlow Bank",
      content: "The mobile banking app they developed for us has received incredible feedback from our customers. The security features and performance are top-notch. Highly recommended!",
      rating: 5,
      image: "/images/Banner1.png"
    },
    {
      name: "Dr. Emily Rodriguez",
      position: "Director",
      company: "MediCare Systems",
      content: "They understood our healthcare compliance requirements perfectly and delivered a robust system that has streamlined our operations significantly. Professional and reliable.",
      rating: 5,
      image: "/images/Banner.png"
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
                  Client Testimonials
                </h4>
                <div className="w-[100px] mx-auto">
                  <LineAnimation />
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-sudo-header-56 font-heading leading-tight">
              What Our
              <span className="gradient-text-static block">Clients Say</span>
            </h2>
            <p className="text-sudo-paragraph-20 text-sudo-white-4 leading-relaxed max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-sudo-neutral-5 rounded-2xl p-6 space-y-6 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-sudo-purple-3 opacity-20">
                  <Quote size={24} />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-sudo-purple-3 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sudo-white-3 leading-relaxed text-sm">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-sudo-neutral-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sudo-purple-3 to-sudo-blue-4 rounded-full flex items-center justify-center">
                    <span className="text-sudo-white-1 font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sudo-white-1 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-sudo-white-4 text-xs">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-16 border-t border-sudo-neutral-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-sudo-purple-3">98%</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-sudo-blue-3">200+</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-sudo-purple-3">50+</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Happy Clients</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-sudo-blue-3">4.9/5</div>
              <div className="text-sudo-white-4 text-sm uppercase tracking-wider">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
