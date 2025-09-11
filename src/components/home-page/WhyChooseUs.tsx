import { ArrowRight, Plus, Lightbulb, Users, HeartHandshake } from "lucide-react";
import LineAnimation from "../animations/LineAnimation";

const featureCards = [
    {
        title: "Solution-Focused Approach",
        description:
            "We don't just build — we analyze, strategize, and solve. Every product starts with a clear understanding of your business goals, so what we deliver actually drives results and impact.",
        gradient: "from-indigo-900/20 via-purple-900/20 to-indigo-900/20",
        iconColor: "text-indigo-400",
        icon: <Lightbulb className="w-32 h-32" />,
    },
    {
        title: "Human-Centered Design",
        description:
            "Our design process is built around empathy. Every interaction is crafted with the end user in mind — creating seamless, intuitive experiences that inspire engagement and trust.",
        gradient: "from-pink-900/20 via-rose-900/20 to-pink-900/20",
        iconColor: "text-pink-400",
        icon: <HeartHandshake className="w-32 h-32" />,
    },
    {
        title: "Agile & Transparent Process",
        description:
            "We use agile workflows to keep you in the loop, iterate fast, and deliver value continuously. You get full visibility and flexibility from kickoff to deployment — and beyond.",
        gradient: "from-emerald-900/20 via-teal-900/20 to-emerald-900/20",
        iconColor: "text-emerald-400",
        icon: <Users className="w-32 h-32" />,
    },
    {
        title: "Long-Term Partnership",
        description:
            "We're not a one-and-done agency. We believe in building strong relationships that last. From scaling to support, we're by your side as your digital partner for growth.",
        gradient: "from-orange-900/20 via-amber-900/20 to-orange-900/20",
        iconColor: "text-orange-400",
        icon: <Plus className="w-32 h-32" />,
    },
    {
        title: "Driven by Innovation",
        description:
            "Our mindset is future-first. We actively explore emerging technologies and creative strategies to make sure your product isn't just modern — it's ahead of the curve.",
        gradient: "from-blue-900/20 via-cyan-900/20 to-blue-900/20",
        iconColor: "text-blue-400",
        icon: <ArrowRight className="w-32 h-32" />,
    },
];

export default function WhyChooseUs() {
    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-sudo-neutral-6 to-slate-900 py-20 sm:py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
            
            <section className="relative sudo-container space-y-16">
                {/* Section Title */}
                <div className="flex justify-center">
                    <div className="space-y-6 text-center md:max-w-2/3">
                        <div>
                            <h4 className="uppercase font-bold text-sudo-white-2">What We Build</h4>
                            <div className="w-[100px] mx-auto">
                                <LineAnimation />
                            </div>
                        </div>

                        <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] text-sudo-white-1 font-heading">
                            Choosing the Right Team Changes Everything
                        </h2>

                        <p className="text-sudo-paragraph-20 text-sudo-white-3">
                            With years of experience across industries, we don&apos;t guess — we execute.
                            Our team brings clarity, confidence, and craftsmanship to every step of your journey.
                        </p>
                    </div>
                </div>

                {/* Features / Values */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
                    {featureCards.map((card, index) => {
                        const gridClasses = [
                            "group relative bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-8 flex flex-col gap-6 hover:shadow-3xl hover:border-slate-600/70 hover:scale-[1.02] transition-all duration-500 overflow-hidden",
                        ];

                        // Custom layout
                        if (index === 3 || index === 4) gridClasses.push("sm:col-span-3");
                        else gridClasses.push("sm:col-span-2");

                        return (
                            <div key={index} className={gridClasses.join(" ")}>
                                {/* Large Background Icon */}
                                <div className={`absolute -top-8 -right-8 ${card.iconColor} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}>
                                    {card.icon}
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-sudo-white-1 leading-snug tracking-tight mb-4">
                                        {card.title}
                                    </h3>

                                    {/* Detailed Description */}
                                    <p className="text-[15px] text-sudo-white-3 leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                                {/* Decorative hover border effect */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sudo-white-2 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
