import { ArrowRight, Plus, Lightbulb, Users, HeartHandshake } from "lucide-react";
import LineAnimation from "../animations/LineAnimation";;


const featureCards = [
    {
        title: "Solution-Focused Approach",
        description:
            "We don’t just build — we analyze, strategize, and solve. Every product starts with a clear understanding of your business goals, so what we deliver actually drives results and impact.",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-700",
        icon: <Lightbulb className="w-5 h-5" />,
    },
    {
        title: "Human-Centered Design",
        description:
            "Our design process is built around empathy. Every interaction is crafted with the end user in mind — creating seamless, intuitive experiences that inspire engagement and trust.",
        iconBg: "bg-pink-100",
        iconColor: "text-pink-700",
        icon: <HeartHandshake className="w-5 h-5" />,
    },
    {
        title: "Agile & Transparent Process",
        description:
            "We use agile workflows to keep you in the loop, iterate fast, and deliver value continuously. You get full visibility and flexibility from kickoff to deployment — and beyond.",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
        icon: <Users className="w-5 h-5" />,
    },
    {
        title: "Long-Term Partnership",
        description:
            "We're not a one-and-done agency. We believe in building strong relationships that last. From scaling to support, we're by your side as your digital partner for growth.",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-700",
        icon: <Plus className="w-5 h-5" />,
    },
    {
        title: "Driven by Innovation",
        description:
            "Our mindset is future-first. We actively explore emerging technologies and creative strategies to make sure your product isn't just modern — it's ahead of the curve.",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        icon: <ArrowRight className="w-5 h-5" />,
    },
];

export default function WhyChooseUs() {
    return (
        <div className="bg-sudo-neutral-6 py-20 sm:py-24">
            <section className=" sudo-container space-y-16">
                {/* Section Title */}
                <div className="flex justify-center">
                    <div className="space-y-6 text-center md:max-w-2/3">
                        <div>
                            <h4 className="uppercase font-bold text-sudo-white-2">What We Build</h4>
                            <div className="w-[100px] mx-auto">
                                <LineAnimation />
                            </div>
                        </div>

                        <h2 className=" text-sudo-title-28 lg:text-sudo-title-48  md:leading-[60px]  text-sudo-white-1 font-heading">
                            Choosing the Right Team Changes Everything
                        </h2>

                        <p className="text-sudo-paragraph-20 text-sudo-white-3">
                            With years of experience across industries, we don’t guess — we execute.
                            Our team brings clarity, confidence, and craftsmanship to every step of your journey.
                        </p>


                    </div>
                </div>


                {/* Features / Values */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
                    {featureCards.map((card, index) => {
                        const gridClasses = [
                            "group bg-sudo-white-1 rounded-2xl border border-sudo-white-2 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md hover:border-sudo-neutral-2 transition-all duration-300",
                        ];

                        // Custom layout
                        if (index === 3 || index === 4) gridClasses.push("sm:col-span-3");
                        else gridClasses.push("sm:col-span-2");

                        return (
                            <div key={index} className={gridClasses.join(" ")}>
                                {/* Icon area */}
                                <div className={`p-4 rounded-xl w-fit ${card.iconBg}`}>
                                    <div className={`${card.iconColor} w-6 h-6`}>
                                        {card.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-sudo-neutral-6 leading-snug tracking-tight">
                                    {card.title}
                                </h3>

                                {/* Detailed Description */}
                                <p className="text-[15px] text-sudo-neutral-4 leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Decorative hover border effect */}
                                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-sudo-white-2 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </div>
                        );
                    })}
                </div>

            </section>
        </div>
    );
}
