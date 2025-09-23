'use client';

import Link from "next/link";
import AnimatedMarque from "../animations/AnimatedMarque";
import LineAnimation from "../animations/LineAnimation";
import { TestimonialCard } from "../core/cards/TestimonialCard";
import Button from "../ui/button";



export const testimonials = [
    {
        title: "A game changer for us",
        feedback:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum aute irure dolor in reprehenderit.",
        author: {
            name: "Sophie Moore",
            role: "Entrepreneur",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80", // Software developer profile
        },
        quoteColor: "text-purple-400",
    },
    {
        title: "Incredible results in weeks",
        feedback:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: {
            name: "Marcus Finn",
            role: "CEO at Growthly",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        },
        quoteColor: "text-blue-500",
    },
    {
        title: "Best investment we've made",
        feedback:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: {
            name: "Clara Bennett",
            role: "Marketing Director",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        },
        quoteColor: "text-green-500",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="pt-20 overflow-hidden"> {/* Add overflow-hidden to the main section */}
            <div className="max-w-6xl mx-auto space-y-12 text-center px-6 md:px-12">
                {/* Heading */}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col justify-center items-center mx-auto w-fit">
                        <h4 className="uppercase font-bold">Testimonials</h4>
                        <div className="w-2/4">
                            <LineAnimation />
                        </div>
                    </div>
                    <h2 className="text-sudo-title-28 lg:text-sudo-title-48  md:leading-[60px] text-sudo-neutral-6 font-heading md:w-3/4 mx-auto text-center">Don’t take our word, see what our clients say.
                    </h2>
                    <Link href={'/about'} className="py-3">
                        <Button label="Explore more" />
                    </Link>
                </div>
            </div>

            <div className="mt-16 ">
                <AnimatedMarque
                    direction="left"
                    isHoverActive={false}
                    duplicateNumber={3}
                    duration={10}
                    textClassName="!whitespace-normal"
                    fadeLeft
                    fadeRight
                    fadeWidth={150}
                >
                    <div className=" py-12 flex  ">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className={`flex-shrink-0 px-5 ${idx % 2 === 0 && '-mt-16'} `}>
                                <TestimonialCard
                                    title={testimonial.title}
                                    feedback={testimonial.feedback}
                                    author={testimonial.author}
                                    quoteColor={testimonial.quoteColor}
                                />
                            </div>
                        ))}
                    </div>
                </AnimatedMarque>
            </div>
           
        </section>
    );
}
