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
// import FloatingCardsSection from "./FloatingCardSection"
// import ContactSection from "./ContactSection"

const HomePageContainer = () => {
    useSmoothScroll()
    return (
        // sudo-container
        <div className=" space-y-10 md:space-y-16 pt-20 md:pt-28 lg:pt-36 ">
            <HeroSection />
            <div>
                <IndustryWeServe />
                <WhyChooseUs />
                <AboutSection />
                <FaqSection />
                <TestimonialsSection />
            </div>
            <div>
                <ContactSection />
                <BlogSection />
                {/* <ServiceSection /> */}
                <CtaSection />
            </div>

            {/* <FloatingCardsSection/> */}
        </div>
    )
}
export default HomePageContainer