import ScrollRevealText from "@/components/animations/ScrollRevealText";

const MoreAboutUs = () => {
    const passage = "We are a UK-based startup specializing in custom software development and business solutions. From modern web apps to automation tools, we help startups and enterprises turn ideas into scalable products.";

    return (
        <div className="sudo-container    min-h-[70vh] ">
            <div className="bg-sudo-blue-8  rounded-2xl p-10">
                <div className="relative z-20 max-w-[70%] space-y-5">
                    <ScrollRevealText className="text-sudo-white-2" text={passage} />
                    <p className="text-sudo-paragraph-20 text-sudo-white-2">{`Whether it's a web application, automation system, or a complete digital transformation, we work closely with our clients to deliver solutions that are tailored, reliable, and built to grow. At our core, we believe in quality, transparency, and long-term partnerships that create lasting value.`}</p>
                </div>
            </div>
        </div>
    )
}
export default MoreAboutUs