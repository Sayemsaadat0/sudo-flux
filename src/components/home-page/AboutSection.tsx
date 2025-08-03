
import { Lightbulb, Users, HeartHandshake, } from "lucide-react";

import { ArrowRight } from "lucide-react"
import Button from "@/components/ui/button"
import LineAnimation from "../animations/LineAnimation";
import ScrollRevealText from "../animations/ScrollRevealText";
import AnimatedImage from "../animations/AnimatedImage";
import CountUp from "../animations/CountUp";

export default function AboutSection() {
    const featureCards = [
        {
            title: "Creative Thinking",
            description: "We believe in pushing boundaries and turning fresh ideas into practical digital solutions.",
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-700",
            icon: <Lightbulb className="w-5 h-5" />,
        },
        {
            title: "Team Collaboration",
            description: "Our diverse team works together seamlessly, combining skills to tackle real-world problems.",
            iconBg: "bg-teal-100",
            iconColor: "text-teal-700",
            icon: <Users className="w-5 h-5" />,
        },
        {
            title: "Customer-Centric",
            description: "Every decision we make revolves around delivering meaningful value to our customers.",
            iconBg: "bg-rose-100",
            iconColor: "text-rose-700",
            icon: <HeartHandshake className="w-5 h-5" />,
        },
    ];

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

    const stats = [
        {
            id: 1,
            // icon: <ChartArea  className="text-3xl text-indigo-500" />,
            label: "Projects Delivered",
            from: 0,
            to: 120,
        },
        {
            id: 2,
            // icon: <User  className=" text-green-500" />,
            label: "Happy Clients",
            from: 0,
            to: 80,
        },
        {
            id: 3,
            // icon: <Clock  className=" text-yellow-500" />,
            label: "Years of Experience",
            from: 0,
            to: 5,
        },
    ];

    return (
        <section className="pt-16 px-4 md:px-6 lg:px-8 sudo-container ">
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column */}
                <div className="space-y-6 ">
                    <div className="space-y-4">
                        <div className=" w-fit">
                            <h4 className="uppercase font-bold">Who We Are</h4>
                            <div className="w-4/5">
                                <LineAnimation />
                            </div>
                        </div>
                        <div className="relative z-20">
                            <ScrollRevealText text={passage} coloredWords={wordsToColor} />
                        </div>
                        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-10">
                            {stats.map((stat) => (
                                <div key={stat.id} className="flex space-y-3">
                                    {/* <span className="">{stat.icon}</span> */}
                                    <div className="flex flex-col justify-between">
                                        <CountUp
                                            from={stat.from}
                                            to={stat.to}
                                            duration={1.5}
                                            separator=","
                                            direction="up"
                                            className="text-sudo-title-48 font-extrabold text-gray-900 count-up-text"
                                        />
                                        <p className="text-lg font-medium text-gray-700">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            label="More About us"
                            icon={<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            }
                            variant="outlineBtn"
                            className="w-fit group hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                        >

                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                        {featureCards.map((card, index) => (
                            <div key={index} className=" bg-sudo-white-1 shadow-sm rounded-xl p-4 flex flex-col items-start space-y-3">
                                <div className={`${card.iconBg} ${card.iconColor} rounded-lg p-2`}>
                                    {card.icon}
                                </div>
                                <h4 className="text-lg font-semibold">{card.title}</h4>
                                <p className="text-sm text-muted-foreground">{card.description}</p>
                            </div>
                        ))}
                    </div>


                    {/* bellow card  icon */}
                </div>

                {/* Right Column */}
                <div className="relative">
                    <div className="relative  w-full">
                        <AnimatedImage
                            className="sm:rounded-[10px] md:max-w-full md:rounded-[20px]"
                            src="https://placehold.co/400x400/1e1e1e/FFFFFF.png"
                            width={400}
                            height={400}
                            layout="responsive"
                            objectFit="cover"
                            alt="header-img"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                        />
                        {/* <Image
                            src="/images/Banner.png"
                            alt="Diverse team collaborating around laptops"
                            fill
                            className="object-cover rounded-lg max-h-[550px]"
                        /> */}
                        <div className="absolute top-4 right-4">
                            <Button className="bg-white text-black hover:bg-gray-100 shadow-lg" label="Innovate Now">

                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
