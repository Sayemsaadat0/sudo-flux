import Image from "next/legacy/image"
import LineAnimation from "../animations/LineAnimation"
import CircularText from "../animations/CircularText"
import Link from "next/link"
import AnimatedImage from "../animations/AnimatedImage"
import Button from "../ui/button"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
    return (
        <div className="sudo-container !text-sudo-neutral-6 space-y-10">
            <div className="flex relative items-center z-10">
                <div className="w-full  px-5 space-y-5">
                    <div className="border border-sudo-blue-2 w-fit text-sudo-blue-6 font-semibold  px-4 py-1.5 text-sm bg-sudo-blue-1/70 rounded-full">
                        <span className=' !text-amber-300'>✨</span> Trusted by 500+ Businesses
                    </div>
                    <h1 className="text-sudo-header-60 font-heading leading-[70px]  ">Transform Your Business with
                        <br />
                        <span className="gradient-text-static">{" "}  Sudo Flux</span>
                    </h1>
                    <div>
                        <Button icon={<ArrowRight size={'18'} />} icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100" className="text-sudo-white-2 " label="Free Consultation" />
                    </div>
                </div>
                {/* second */}
                <div className=" space-y-3 ">
                    <div>
                        <h4 className="uppercase font-bold">17 Years of Experience</h4>
                        <div className="w-1/5">
                            <LineAnimation />
                        </div>
                    </div>
                    <p className="max-w-2/3 text-justify">We help businesses scale and succeed in the digital landscape through innovative strategies, cutting-edge technology, and personalized consulting services.</p>
                </div>
                <div className="whitespace-nowrap ">

                    <Link className="" href="/">
                        <CircularText
                            text={`Design • Development • Marketing •`}
                            size={180}
                            letterClassName="font-bold text-2xl"
                        />
                    </Link>
                </div>
            </div>
            <div>
                <div className="relative hidden sm:block ">
                    <div className="w-full mx-auto">
                        <AnimatedImage
                            className="sm:rounded-[10px] md:rounded-[20px]"
                            src="https://placehold.co/600x300/1e1e1e/FFFFFF.png"
                            width={1572}
                            height={600}
                            layout="intrinsic"
                            alt="header-img"
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
                        src="https://placehold.co/600x300/000000/FFFFFF.png"
                        width={630}
                        height={631}
                        objectFit="cover"
                        alt="header-img"
                    />
                </div>
            </div>
        </div>
    )
}
export default HeroSection