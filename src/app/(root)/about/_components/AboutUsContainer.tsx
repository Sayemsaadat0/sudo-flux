'use client'
import useSmoothScroll from "@/hooks/useSmoothScroll"
import AboutUsBanner from "./AboutUsBanner"
import AboutStats from "./AboutStats"
import MoreAboutUs from "./MoreAboutUs"
import WhatSetUsApart from "./WhatSetUsApart"

const AboutUsContainer = () => {
    useSmoothScroll()
    return (
        <div className="space-y-10 md:space-y-16 pt-20 md:pt-28 lg:pt-36 overflow-hidden rounded-b-4xl">
            <AboutUsBanner />
            <MoreAboutUs />
            <div>
                <AboutStats />
                <WhatSetUsApart />
            </div>
        </div>
    )
}
export default AboutUsContainer