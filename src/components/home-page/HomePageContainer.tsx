'use client'

import useSmoothScroll from "@/hooks/useSmoothScroll"
import HeroSection from "./HeroSection"
import AboutSection from "./AboutSection"
// import ServiceSection from "./ServiceSection"
import FaqSection from "./FaqSection"
import BlogSection from "./BlogSection"
import TestimonialsSection from "./TestimonialSection"
import CtaSection from "./CtaSection"
import ContactSection from "./ContactSection"
import IndustryWeServe from "./IndustryWeServe"
import WhyChooseUs from "./WhyChooseUs"
import { useSectionTracking } from "@/hooks/useSectionTracking"
import { useEffect } from "react"
// import FloatingCardsSection from "./FloatingCardSection"
// import ContactSection from "./ContactSection"

const HomePageContainer = () => {
    const { createSectionRef, createSession } = useSectionTracking('home-page')
    // Create session when user enters hero section
    useEffect(() => {
        createSession('hero-section')
    }, [createSession])


    useSmoothScroll()
    return (
        // sudo-container
        <div className=" space-y-10 md:space-y-16 pt-20 md:pt-28 lg:pt-36 ">
            <div ref={createSectionRef('hero-section')}>
                <HeroSection />
            </div>
            <div>
                <div ref={createSectionRef('home-inustry-we-serve')}>
                    <IndustryWeServe />
                </div>
                <div>
                    <WhyChooseUs />
                </div>
                <div ref={createSectionRef('home-about-section')}>
                    <AboutSection />
                </div>
                <div ref={createSectionRef('home-testimonials-section')}>
                    <TestimonialsSection />
                </div>
            </div>
            <div>
                <div ref={createSectionRef('home-contact-section')}>
                    <ContactSection />
                </div>
                <div ref={createSectionRef('home-faq-section')}>
                    <FaqSection />
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