
import { Star } from "lucide-react";

import { ArrowRight } from "lucide-react"
import Button from "@/components/ui/button"
import AnimatedImage from "@/components/animations/AnimatedImage";

export default function AboutUsBanner() {


    return (
        <section className="px-4 md:px-6 lg:px-8 sudo-container ">
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column */}
                <div className="space-y-6 ">
                    <div className="space-y-4">
                        <div className="text-sm font-semibold border px-2 gap-3 rounded-full py-1 border-sudo-blue-6/40 bg-sudo-white-2 shadow text-sudo-blue-6 w-fit flex items-center">
                            <div className="flex items-center gap-">

                            </div>
                            <h4 className="flex items-center"><Star size={18} fill="yellow" className="text-yellow-400" /> 4.97/5 Reviewes</h4>
                        </div>
                        <div className="relative z-20 space-y-5">
                            <h1 className="text-sudo-header-56 font-heading leading-[60px]">Discover our journey and what drives us</h1>
                            <h4 className="text-sudo-paragraph-20">Founded by a team of engineers and entrepreneurs, we blend technical skill with business insight to deliver solutions that are not only functional, but also aligned with your strategic goals.</h4>

                        </div>
                        <Button icon={<ArrowRight size={'18'} />} icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100" className="text-sudo-white-2 " label="Free Consultation" />
                    </div>
                </div>

                {/* Right Column */}
                <div className="relative  flex justify-end ">
                    <div className="relative ">
                        <AnimatedImage
                            className="sm:rounded-[10px] bg-minion-neutral-5  object-cover md:max-w-full md:rounded-[20px]"
                            src="/images/banner.png"
                            // src="https://placehold.co/400x400/FFFFFF/1e1e1e.png"
                            width={600}
                            height={600}
                            // fill
                            // layout="responsive"
                            objectFit="cover"
                            alt="header-img"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                        />
                        <div className="absolute border border-minion-neutral-2 shadow  text-minion-neutral-6 rounded-full bg-minion-white-1 animate-bounce duration-700 ease-in-out transition-all px-5 py-1 top-4 right-4 bounceSlight">
                            Innovate Now
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
