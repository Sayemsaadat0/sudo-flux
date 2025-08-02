'use client'

import useSmoothScroll from "@/hooks/useSmoothScroll"
import HeroSection from "./HeroSection"

const HomePageContainer = () => {
    useSmoothScroll()
    return (
        // sudo-container
        <div className=" space-y-6 md:space-y-10 py-16 md:py-20 lg:py-28">
            <HeroSection/>
        </div>
    )
}
export default HomePageContainer