'use client'

import Link from "next/link";
import LineAnimation from "../animations/LineAnimation";
import clsx from "clsx";
import AnimatedMarque from "../animations/AnimatedMarque";

const ServiceSection = () => {
    const marqueesData = [
        {
            text: "Digital Marketing -",
            direction: "right",
            hoverImageUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
            link: "/",
            duration: 20,
        },
        {
            text: "INNOVATIVE ANIMATIONS -",
            direction: "left",
            hoverImageUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
            link: "/",
            duration: 20,
        },
        {
            text: "Graphic Design -",
            direction: "right",
            hoverImageUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
            link: "/",
            duration: 20,
        },
        {
            text: "Software Development -",
            direction: "left",
            hoverImageUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
            link: "/",
            duration: 20,
        },
        {
            text: "SEO OPTIMIZATION -",
            direction: "left",
            hoverImageUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
            link: "/",
            duration: 20,
        },
    ];

    return (
        <div className="space-y-10 py-20 bg-sudo-white-1">
            <div className="">
                <div className="flex flex-col justify-center items-center mx-auto w-fit">
                    <h4 className="uppercase font-bold">Our Expertise, Your Success</h4>
                    <div className="w-2/4">
                        <LineAnimation />
                    </div>
                </div>
                <h2 className="text-sudo-title-48 text-sudo-neutral-6 font-heading w-2/3 mx-auto text-center">Explore More of Our Services
                </h2>
                <p className="text-center text-sudo-neutral-4 max-w-2xl text-sudo-paragraph-20 mx-auto mt-4">
                    {`From concept to execution, we deliver tailored digital solutions designed to elevate your brand and drive measurable results. Whether you're scaling a startup or refining an established presence, our expertise helps turn ideas into impact. Explore how we can power your growth.`}
                </p>

            </div>
            <div className="flex flex-col justify-center ">
                {marqueesData.map((item, index) => {
                    const isLast = index === marqueesData.length - 1;
                    return (
                        <Link
                            key={index}
                            href={item.link}
                            className={clsx(
                                "border-b border-sudo-neutral-2",
                                isLast && "border-none"
                            )}
                        >
                            <AnimatedMarque
                                direction={item.direction as "left" | "right"}
                                hoverImageUrl={item.hoverImageUrl}
                                duration={item.duration}
                                className=""
                                textClassName="text-sudo-title-48 font-bold uppercase font-heading"
                            >
                                {item.text}
                            </AnimatedMarque>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}
export default ServiceSection