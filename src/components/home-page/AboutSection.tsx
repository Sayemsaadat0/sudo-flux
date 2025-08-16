
// import { Lightbulb, Users, HeartHandshake, Plus, } from "lucide-react";

import { ArrowRight } from "lucide-react"
import Button from "@/components/ui/button"
import LineAnimation from "../animations/LineAnimation";
import ScrollRevealText from "../animations/ScrollRevealText";
import AnimatedImage from "../animations/AnimatedImage";

export default function AboutSection() {
    // const featureCards = [
    //     {
    //         title: "Creative Thinking",
    //         description: "We believe in pushing boundaries and turning fresh ideas into practical digital solutions.",
    //         iconBg: "bg-yellow-100",
    //         iconColor: "text-yellow-700",
    //         icon: <Lightbulb className="w-5 h-5" />,
    //     },
    //     {
    //         title: "Team Collaboration",
    //         description: "Our diverse team works together seamlessly, combining skills to tackle real-world problems.",
    //         iconBg: "bg-teal-100",
    //         iconColor: "text-teal-700",
    //         icon: <Users className="w-5 h-5" />,
    //     },
    //     {
    //         title: "Customer-Centric",
    //         description: "Every decision we make revolves around delivering meaningful value to our customers.",
    //         iconBg: "bg-rose-100",
    //         iconColor: "text-rose-700",
    //         icon: <HeartHandshake className="w-5 h-5" />,
    //     },
    // ];

    const passage = "From humble beginnings to industry leaders in digital innovation";

    const wordsToColor = [
        {
            text: "digital innovation",
            className: "text-sudo-blue-6",
        },
        // {
        //     text: "unique business needs.",
        //     style: {
        //         backgroundImage: "linear-gradient(90deg, purple, blue)",
        //         WebkitBackgroundClip: "text",
        //         backgroundClip: "text",
        //         color: "transparent",
        //     },
        // },
    ];

    // const stats = [
    //     {
    //         id: 1,
    //         icon: <Plus />,
    //         label: "Projects Delivered",
    //         from: 0,
    //         to: 120,
    //     },
    //     {
    //         id: 2,
    //         icon: <Plus />,
    //         label: "Happy Clients",
    //         from: 0,
    //         to: 80,
    //     },
    //     {
    //         id: 3,
    //         icon: <Plus />,
    //         label: "Years of Experience",
    //         from: 0,
    //         to: 5,
    //     },
    // ];


    return (
        <div className="bg-sudo-white-1">
            <section className="sudo-container py-20 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Column */}
                    <div className="space-y-6 order-1">
                        <div className="space-y-4">
                            <div className="w-fit">
                                <h4 className="uppercase font-bold text-sm sm:text-base lg:text-lg">Who We Are</h4>
                                <div className="w-4/5">
                                    <LineAnimation />
                                </div>
                            </div>
                            <div className="relative z-20">
                                <ScrollRevealText text={passage} coloredWords={wordsToColor} />
                            </div>
                            <p className="text-sm sm:text-base lg:text-sudo-paragraph-20 leading-relaxed">
                                We&apos;re not just another agency — we&apos;re your digital growth partner. Our team is made up of thinkers, builders, and problem-solvers who thrive on turning complex challenges into seamless digital solutions. With a deep understanding of design, strategy, and technology, we help brands evolve, connect with their audience, and lead their industries with confidence.
                            </p>
                            <Button 
                                icon={<ArrowRight size={'16'} className="sm:w-[18px] sm:h-[18px]" />} 
                                icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100" 
                                className="text-sudo-white-2 w-fit" 
                                label="More About Us"
                                size="md"
                            />
                            {/* <div className="grid grid-cols-1   rounded-md bg-sudo-white-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                            {stats.map((stat) => (
                                <div key={stat.id} className="flex space-y-3">
                                    <div className="flex p-5 flex-col min-w-[200px] items-center  justify-evenly">
                                        <CountUp
                                            from={stat.from}
                                            to={stat.to}
                                            icon={stat.icon}
                                            iconPosition="after"
                                            iconSize={40}
                                            duration={1.5}
                                            separator=","
                                            direction="up"
                                            className="text-sudo-title-48 font-extrabold text-sudo-blue-8 count-up-text"
                                        />
                                        <p className="text-lg font-medium text-gray-700">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        </div>
                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                        {featureCards.map((card, index) => (
                            <div key={index} className=" bg-sudo-white-1 shadow-sm rounded-xl p-4 flex flex-col items-start space-y-3">
                                <div className={`${card.iconBg} ${card.iconColor} rounded-lg p-2`}>
                                    {card.icon}
                                </div>
                                <h4 className="text-lg font-semibold">{card.title}</h4>
                                <p className="text-sm text-muted-foreground">{card.description}</p>
                            </div>
                        ))}
                    </div> */}
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative flex justify-center lg:justify-end order-2 lg:order-2">
                        <div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px]">
                            <AnimatedImage
                                className="rounded-lg sm:rounded-xl md:rounded-2xl bg-minion-neutral-5 object-cover w-full h-full"
                                src="/images/Banner.png"
                                // src="https://placehold.co/400x400/FFFFFF/1e1e1e.png"
                                width={650}
                                height={650}
                                layout="responsive"
                                aspectRatio="square"
                                containerClassName="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px]"
                                alt="About Us - Digital Innovation Team"
                                priority
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                            />
                            <div className="absolute border border-minion-neutral-2 shadow text-minion-neutral-6 rounded-full bg-minion-white-1 animate-bounce duration-700 ease-in-out transition-all px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-xs sm:text-sm md:text-base bounceSlight">
                                Innovate Now
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
