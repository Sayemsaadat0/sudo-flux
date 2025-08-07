
import Button from "../ui/button";
import AboutSectionCard from "../core/cards/BlogCard";
import LineAnimation from "../animations/LineAnimation";
import Link from "next/link";
// import { div } from "framer-motion/client";

const BlogSection = () => {

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
       <div className="bg-sudo-white-1">
         <div className="sudo-container  space-y-10  py-20">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center mx-auto w-fit">
                    <h4 className="uppercase font-bold">Our Expertise, Your Success</h4>
                    <div className="w-2/4">
                        <LineAnimation />
                    </div>
                </div>
                <h2 className="text-sudo-title-48 text-sudo-neutral-6 font-heading w-2/3 mx-auto text-center">Our Latest Blogs
                </h2>

            </div>
            <div className="space-y-12 flex flex-col items-center justify-center">

                <div className="grid gap-16 grid-cols-1 md:grid-cols-3 ">
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

                <Link href={'/about'} className="py-3">
                    <Button label="Explore more" />
                </Link>
            </div>


        </div>
       </div>
    )
}
export default BlogSection

