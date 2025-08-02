import Link from "next/link";
// import LineAnimation from "../animations/LineAnimation";
import ScrollRevealText from "../animations/ScrollRevealText"
import Button from "../ui/button";
import AboutSectionCard from "../core/cards/AboutSectionCard";

const AboutSection = () => {
    const passage = "Discover the range of tailored services we provide, designed to meet your unique business needs. From creating stunning visuals to implementing data-driven strategies.";

    const wordsToColor = [
        {
            text: "tailored services",
            className: "text-green-400",
        },
        {
            text: "unique business needs",
            style: {
                backgroundImage: "linear-gradient(90deg, #ff8a00, #e52e71)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
            },
        },
    ];


    const aboutData = [
        {
            title: "What Inspires Us",
            description:
                "We are fueled by curiosity, creativity, and a passion for meaningful progress. The world’s complexities inspire us to think deeper, challenge the status quo, and find better ways to make things work. Whether it’s solving a problem or enhancing an experience, we’re constantly looking for ways to leave a positive mark — not just through technology, but through thoughtful, human-centered innovation.",
            thumbnailUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
        },
        {
            title: "What We Build",
            description:
                "We create solutions that merge form and function — blending elegant design with reliable performance. Our work spans digital experiences, tools, and systems built to serve real needs and scale with purpose. Every product we build is guided by clarity, empathy, and attention to detail, ensuring that it not only works but resonates with the people who use it.",
            thumbnailUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
        },
        {
            title: "What Sets Us Apart",
            description:
                "Beyond our skills and tools, it’s our mindset that makes the difference. We don’t chase trends — we chase impact. We believe in asking the right questions, in listening closely, and in building with integrity. From how we collaborate to how we ship, everything we do is rooted in care, excellence, and a deep respect for the craft and the people behind it.",
            thumbnailUrl:
                "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1887&auto=format&fit=crop",
        },
    ];
    return (
        <div className="sudo-container py-10 space-y-10">
            <div className=" relative space-y-5 flex flex-col justify-center items-center ">
                <div className="absolute bg-sudo-purple-5 w-32 h-32 top-0 left-0 rounded-full blur-[60px]"></div>
                <div className="absolute bg-sudo-blue-5 w-32 h-32 -bottom-20 right-0 rounded-full blur-[60px]"></div>
                <div className="relative z-20">
                    <ScrollRevealText text={passage} coloredWords={wordsToColor} className="!text-center" />
                </div>
                <Link href={'/about'} className="py-3">
                    <Button label="More About Us" />
                </Link>
            </div>
            <div>
                <div className="space-y-12">
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-3 ">
                        {aboutData.map((item, index) => (
                            <AboutSectionCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                thumbnailUrl={item.thumbnailUrl}
                                link="#"
                            />
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default AboutSection