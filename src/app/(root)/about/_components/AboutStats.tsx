import AnimatedImage from "@/components/animations/AnimatedImage";
import CountUp from "@/components/animations/CountUp";
import { Plus } from "lucide-react";


const AboutStats = () => {
    const stats = [
        {
            id: 1,
            icon: <Plus />,
            label: "Projects Delivered",
            description:
                "Over the years, we have successfully completed more than 120 diverse projects, ensuring top quality and client satisfaction every step of the way.",
            from: 0,
            to: 120,
        },
        {
            id: 2,
            icon: <Plus />,
            label: "Happy Clients",
            description:
                "We pride ourselves on building strong, long-lasting relationships with over 80 happy clients. ",
            from: 0,
            to: 80,
        },
        {
            id: 3,
            icon: <Plus />,
            label: "Years of Experience",
            description:
                "Our team brings over 5 years of combined industry experience, applying best practices and the latest technologies to help businesses grow..",
            from: 0,
            to: 5,
        },
        {
            id: 4,
            icon: <Plus />,
            label: "Team Members",
            description:
                "A talented and diverse team of 12 professionals passionate about creating impactful software.",
            from: 0,
            to: 12,
        },
    ];


    return (
        <section className="bg-sudo-white-1 py-16 md:py-24 ">
            <div className="sudo-container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-24  items-start">
                    <div className="lg:sticky lg:top-24 w-full">
                        <AnimatedImage
                            className="rounded-xl shadow-lg w-full h-auto object-cover"
                            src="https://placehold.co/400x400/1e1e1e/FFFFFF/png?text=Your\nImage\nHere"
                            width={700}
                            height={800}
                            alt="FAQ illustration"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkSPlfDwADswHkz8UV3wAAAABJRU5ErkJggg=="
                        />
                    </div>

                    {/* --- RIGHT COLUMN: CONTENT + ACCORDION --- */}
                    <div className="h-full">
                        <div className="flex flex-col justify-between h-full  gap-8">
                            {stats.map((stat) => (
                                <div
                                    key={stat.id}
                                    className="bg-sudo-blue-1 rounded-3xl p-8 grid grid-cols-3 gap-10 justify-between  "
                                    style={{ minHeight: '150px' }} // increased min height for more span
                                >
                                    <div className="col-span-1 ">
                                        <CountUp
                                            from={stat.from}
                                            to={stat.to}
                                            icon={stat.icon}
                                            iconPosition="after"
                                            iconSize={40}
                                            duration={1.5}
                                            separator=","
                                            direction="up"
                                            className="text-sudo-title-48 font-extrabold text-sudo-blue-5"
                                        />
                                        <p className=" text-sudo-paragraph-20 whitespace-nowrap font-bold  text-sudo-neutral-6">{stat.label}</p>
                                    </div>
                                    <p className="col-span-2   text-sudo-paragraph-20 text-sudo-white-6">{stat.description}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutStats;