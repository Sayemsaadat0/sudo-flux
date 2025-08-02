'use client'

import useSmoothScroll from "@/hooks/useSmoothScroll"
import HeroSection from "./HeroSection"
import AboutSection from "./AboutSection"
import ServiceSection from "./ServiceSection"

const HomePageContainer = () => {
    useSmoothScroll()
    return (
        // sudo-container
        <div className=" space-y-10 md:space-y-16 pt-20 md:pt-28 lg:pt-36 pb-20">
            <HeroSection />
            <AboutSection />
            <ServiceSection />
        </div>
    )
}
export default HomePageContainer