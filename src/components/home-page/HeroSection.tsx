import Image from "next/legacy/image"
import LineAnimation from "../animations/LineAnimation"
import CircularText from "../animations/CircularText"
import Link from "next/link"

const HeroSection = () => {
    /* 
    Transform Your Business with Digital Growth- header
    - We help businesses scale and succeed in the digital landscape through innovative strategies, cutting-edge technology, and personalized consulting services.
    */
    return (
        <div className="sudo-container !text-sudo-neutral-6 space-y-10">
            <div className="flex relative items-center z-10">
                <div className="w-full px-5">
                    <div className="border border-sudo-blue-2 w-fit text-sudo-blue-6 font-semibold  px-4 py-1.5 text-sm bg-sudo-blue-1/70 rounded-full">
                        <span className=' !text-amber-300'>✨</span> Trusted by 500+ Businesses
                    </div>
                    <h1 className="text-sudo-header-56 font-heading leading-[70px]  ">Transform Your Business with
                        <br />
                        <span className="gradient-text-static">{" "}  Sudo Flux</span>
                    </h1>
                </div>
                {/* second */}
                <div className=" w-full space-y-3">
                    <div>
                        <h4 className="uppercase font-bold">17 Years of Experience</h4>
                        <div className="w-1/5">
                            <LineAnimation />
                        </div>
                    </div>
                    <p className="max-w-2/3 text-justify">We help businesses scale and succeed in the digital landscape through innovative strategies, cutting-edge technology, and personalized consulting services.</p>
                </div>
                <div className="whitespace-nowrap">

                    <Link className="" href="/">
                        <CircularText
                            text={`HELLO${' '}WORLD ` }
                            size={150}
                            letterClassName="font-bold text-2xl"
                            // className="bg-gray-900"
                        />

                    </Link>
                </div>
            </div>
            <div>
                <div className="relative hidden sm:block ">
                    <Image
                        className="sm:rounded-[10px] md:rounded-[20px] "
                        src="/images/Banner1.png"
                        width={1272}
                        height={431}
                        layout="responsive"
                        objectFit="cover"
                        alt="header-img"
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                    />
                    <div className="absolute inset-0 bg-black/20 sm:rounded-[10px] md:rounded-[20px]"></div>
                </div>
                <div className="relative block sm:hidden ">
                    <Image
                        className="rounded-[20px] object-contain object-center"
                        src="/images/Banner1.png"
                        width={630}
                        height={631}
                        objectFit="cover"
                        alt="header-img"
                    />
                </div>
            </div>
            {/* <ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' /> */}
        </div>
    )
}
export default HeroSection