'use client'
import useSmoothScroll from "@/hooks/useSmoothScroll"
import AboutUsBanner from "./AboutUsBanner"
import AboutStats from "./AboutStats"
import MoreAboutUs from "./MoreAboutUs"
import TestimonialsSection from "@/components/home-page/TestimonialSection"
import ContactSection from "@/components/home-page/ContactSection"
import BlogSection from "@/components/home-page/BlogSection"
import CtaSection from "@/components/home-page/CtaSection"
import TeamSection from "./TeamSection"

const AboutUsContainer = () => {
    useSmoothScroll()
    return (
        <div className="space-y-10 md:space-y-16 pt-20 md:pt-28 lg:pt-36 overflow-hidden rounded-b-4xl">
            <AboutUsBanner />
            <MoreAboutUs />
            <div>
                <AboutStats />
                <TeamSection />
                <TestimonialsSection />
                <ContactSection />
                <BlogSection />
                <CtaSection />
                {/* <WhatSetUsApart /> */}
            </div>
        </div>
    )
}
export default AboutUsContainer