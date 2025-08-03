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
            image: "https://placehold.co/400x400/1e1e1e/FFFFFF.png", // Put this image inside /public/avatars/
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
            image: "https://placehold.co/400x400/1e1e1e/FFFFFF.png",
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
            image: "https://placehold.co/400x400/1e1e1e/FFFFFF.png",
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
                    <h2 className="text-sudo-title-48 text-sudo-neutral-6 font-heading w-3/4 mx-auto text-center">Don’t take our word, see what our clients say.
                    </h2>
                    <Link href={'/about'} className="py-3">
                        <Button label="Explore more" />
                    </Link>
                </div>
            </div>

            {/* --- Marquee Integration --- */}
            {/* The static grid is replaced by our AnimatedMarque component */}
            <div className="mt-16">
                <AnimatedMarque
                    direction="left"
                    isHoverActive={false}
                    duration={50}
                    textClassName="!whitespace-normal"
                    fadeLeft
                    fadeRight
                    fadeWidth={150}
                >
                    <div className="flex py-12">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className={`mx-4 flex-shrink-0 ${idx % 2 === 0 && '-mt-16'} `}>
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
