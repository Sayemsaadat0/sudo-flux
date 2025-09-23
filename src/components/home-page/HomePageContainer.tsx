'use client'

import useSmoothScroll from "@/hooks/useSmoothScroll"
import HeroSection from "./HeroSection"
import AboutSection from "./AboutSection"
// import ServiceSection from "./ServiceSection"
import FaqSection from "./FaqSection"
import BlogSection from "./BlogSection"
// import TestimonialsSection from "./TestimonialSection"
import CtaSection from "./CtaSection"
import ContactSection from "./ContactSection"
import IndustryWeServe from "./IndustryWeServe"
import WhyChooseUs from "./WhyChooseUs"
import { useSectionTracking } from "@/hooks/useSectionTracking"
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
// import FloatingCardsSection from "./FloatingCardSection"
// import ContactSection from "./ContactSection"

// Shapes aligned with API /models
export interface IndustryItem {
  _id: string;
  title: string;
  description: string;
  publish?: boolean;
}

export interface BlogItem {
  _id: string;
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  published?: boolean;
  metaDescription?: string;
  slug?: string;
  banner_image?: string;
  createdAt?: string;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: "general" | "about-us" | "career";
  publish: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HomePageContainerProps {
  industries: IndustryItem[];
  faqs: FaqItem[];
}

const HomePageContainer = ({ industries, faqs }: HomePageContainerProps) => {
    const { sessionId } = useVisitorTracking()
    const { createSectionRef } = useSectionTracking('home-page', sessionId)

    useSmoothScroll()
    return (
        // sudo-container
        <div className=" space-y-10 md:space-y-16 pt-20 md:pt-28 lg:pt-36 ">
            <div ref={createSectionRef('hero-section')}>
                <HeroSection />
            </div>
            <div>
                <div ref={createSectionRef('home-inustry-we-serve')}>
                    <IndustryWeServe industries={industries} />
                </div>
                <div>
                    <WhyChooseUs />
                </div>
                <div ref={createSectionRef('home-about-section')}>
                    <AboutSection />
                </div>
                {/* <div ref={createSectionRef('home-testimonials-section')}>
                    <TestimonialsSection />
                </div> */}
            </div>
            <div>
                <div ref={createSectionRef('home-contact-section')}>
                    <ContactSection />
                </div>
                <div ref={createSectionRef('home-faq-section')}>
                    <FaqSection faqs={faqs} />
                </div>
                <div ref={createSectionRef('home-blog-section')}>
                    <BlogSection />
                </div>
                {/* <ServiceSection /> */}
                <div ref={createSectionRef('home-cta-section')}>
                    <CtaSection />
                </div>
            </div>

            {/* <FloatingCardsSection/> */}
        </div>
    )
}
export default HomePageContainer