'use client'
import useSmoothScroll from "@/hooks/useSmoothScroll"
import AboutUsBanner from "./AboutUsBanner"
import AboutStats from "./AboutStats"
import TestimonialsSection from "@/components/home-page/TestimonialSection"
import ContactSection from "@/components/home-page/ContactSection"
import BlogSection from "@/components/home-page/BlogSection"
import CtaSection from "@/components/home-page/CtaSection"
import TeamSection from "./TeamSection"
import WhereWeAreBased from "./WhereWeAreBased"
import { useVisitorTracking } from "@/hooks/useVisitorTracking"
import { useSectionTracking } from "@/hooks/useSectionTracking"

const AboutUsContainer = () => {
    useSmoothScroll()
    const { sessionId } = useVisitorTracking()
    const { createSectionRef } = useSectionTracking('about-page', sessionId)

    return (
        <div className="space-y-10 md:space-y-16 overflow-hidden rounded-b-4xl">
            <div ref={createSectionRef('about-banner-section')}>
                <AboutUsBanner />
            </div>
            {/* <div ref={createSectionRef('about-more-about-section')}>
                <MoreAboutUs />
            </div> */}
            <div>
                <div ref={createSectionRef('about-stats-section')}>
                    <AboutStats />
                </div>
                <div ref={createSectionRef('about-location-section')}>
                    <WhereWeAreBased />
                </div>
                <div ref={createSectionRef('about-team-section')}>
                    <TeamSection />
                </div>
                <div ref={createSectionRef('about-testimonials-section')}>
                    <TestimonialsSection />
                </div>
                <div ref={createSectionRef('about-contact-section')}>
                    <ContactSection />
                </div>
                <div ref={createSectionRef('about-blog-section')}>
                    <BlogSection />
                </div>
                <div ref={createSectionRef('about-cta-section')}>
                    <CtaSection />
                </div>
                {/* <WhatSetUsApart /> */}
            </div>
        </div>
    )
}
export default AboutUsContainer