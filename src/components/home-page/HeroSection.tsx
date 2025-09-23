// import Image from "next/legacy/image"
import LineAnimation from "../animations/LineAnimation"
import CircularText from "../animations/CircularText"
import Link from "next/link"
// import AnimatedImage from "../animations/AnimatedImage"
import Button from "../ui/button"
import { ArrowRight } from "lucide-react"
import ZoomScrollReveal from "../animations/ZoomScrollReveal"

const HeroSection = () => {
    return (
        <div className="sudo-container !text-sudo-neutral-6 space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="flex flex-col lg:flex-row relative items-start lg:items-center z-10 gap-8 lg:gap-12">
                {/* Main Content */}
                <div className="w-full lg:w-2/3 px-4 sm:px-5 space-y-4 sm:space-y-5 lg:space-y-6">
                    <div className="border border-sudo-blue-2 w-fit text-sudo-blue-6 font-semibold px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-sudo-blue-1/70 rounded-full">
                        <span className='!text-amber-300'>✨</span> Trusted by 500+ Businesses
                    </div>
                    <h1 className="text-sudo-header-42 md:text-sudo-header-56  text-center md:text-left xl:text-sudo-header-60 font-heading leading-tight sm:leading-[1.1] md:leading-[1.15] lg:leading-[70px]">
                        Transform Your Business with
                        <br />
                        <span className="gradient-text-static">{" "}Sudo Flux</span>
                    </h1>
                    <p className="text-sm block lg:hidden sm:text-base lg:text-lg leading-relaxed sm:leading-relaxed lg:leading-relaxed lg:text-justify text-center md:text-left max-w-full lg:max-w-2/3">
                        We help businesses scale and succeed in the digital landscape through innovative strategies, cutting-edge technology, and personalized consulting services.
                    </p>
                    <div className="flex  justify-center md:justify-start items-center gap-3 sm:gap-4 w-full">
                        <Link className="w-full sm:w-auto" href={'/free-consultation'}>
                            <Button
                                icon={<ArrowRight size={'16'} className="sm:w-[18px] sm:h-[18px]" />}
                                icon_style="border  border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100"
                                className="text-sudo-white-2 w-full sm:w-auto min-w-[100px] max-w-[w00px]"
                                label="Free Consultation"
                                size="md"
                            />
                        </Link>
                        <Link className="w-full sm:w-auto" href={'/contact'}>
                            <Button
                                icon={<ArrowRight size={'16'} className="sm:w-[18px] sm:h-[18px]" />}
                                variant={'outlineBtn'}
                                icon_style="bg-sudo-blue-6 opacity-100 text-sudo-white-1 border-transparent"
                                className="text-sudo-neutral-5 w-full sm:w-auto min-w-[100px] max-w-[w00px]"
                                label="Book Now"
                                size="md"
                            />
                        </Link>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="w-full hidden lg:block lg:w-1/3 space-y-3 sm:space-y-4 px-4 sm:px-5 lg:px-0">
                    <div className="">
                        <h4 className="uppercase font-bold text-sm sm:text-base lg:text-lg">17 Years of Experience</h4>
                        <div className="w-1/5">
                            <LineAnimation />
                        </div>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-relaxed lg:leading-relaxed text-justify lg:text-left max-w-full lg:max-w-2/3">
                        We help businesses scale and succeed in the digital landscape through innovative strategies, cutting-edge technology, and personalized consulting services.
                    </p>
                </div>

                {/* Circular Text - Hidden on mobile, visible on tablet and up */}
                <div className="hidden md:block whitespace-nowrap lg:flex-shrink-0">
                    <Link className="" href="/">
                        <CircularText
                            text={`Design • Development • Marketing •`}
                            size={180}
                            letterClassName="font-bold text-lg lg:text-2xl"
                        />
                    </Link>
                </div>
            </div>

            {/* Video Section */}
            <div className="sm:px-5 lg:px-0">
                <ZoomScrollReveal videoUrl="https://www.youtube.com/embed/bON-KPiiNCk?si=CwqmdZg1_5lnrCYh" />
                {/* <div className="relative hidden sm:block ">
                    <div className="w-full mx-auto">
                        <AnimatedImage
                            className="sm:rounded-[10px] md:rounded-[20px]"
                            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                            width={1572}
                            height={600}
                            layout="intrinsic"
                            alt="Software development team working on modern web applications"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/20 sm:rounded-[10px] md:rounded-[20px]"></div>
                </div>
                <div className="relative block sm:hidden ">
                    <Image
                        className="rounded-[20px] object-contain object-center"
                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                        width={630}
                        height={631}
                        objectFit="cover"
                        alt="Software development team working on modern web applications"
                    />
                </div> */}
            </div>
        </div>
    )
}
export default HeroSection