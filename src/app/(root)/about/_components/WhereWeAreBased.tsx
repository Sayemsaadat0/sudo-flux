'use client'
import { MapPin, Globe, Users, Clock } from "lucide-react";
import LineAnimation from "@/components/animations/LineAnimation";
import LocationMap from "./LocationMap";

const WhereWeAreBased = () => {
    const locations = [
        {
            id: 1,
            city: "San Francisco",
            country: "United States",
            description: "Our main headquarters where innovation meets execution. Home to our core development team and strategic partnerships.",
            timezone: "PST (UTC-8)",
            teamSize: "25+",
            focus: "Product Development & Strategy",
            fallbackColor: "from-sudo-blue-5/20 to-sudo-purple-5/20"
        },
        {
            id: 2,
            city: "London",
            country: "United Kingdom",
            description: "Our European hub connecting us with clients across the continent. Specializing in enterprise solutions and consulting.",
            timezone: "GMT (UTC+0)",
            teamSize: "15+",
            focus: "Enterprise Solutions & Consulting",
            fallbackColor: "from-sudo-purple-5/20 to-sudo-blue-5/20"
        },
        {
            id: 3,
            city: "Singapore",
            country: "Singapore",
            description: "Our Asia-Pacific center driving digital transformation across the region. Leading innovation in fintech and e-commerce.",
            timezone: "SGT (UTC+8)",
            teamSize: "20+",
            focus: "Fintech & E-commerce",
            fallbackColor: "from-sudo-blue-5/20 to-sudo-purple-5/20"
        }
    ];

    const stats = [
        {
            icon: <Globe className="w-6 h-6" />,
            label: "Global Reach",
            value: "3 Continents",
            description: "Serving clients worldwide with local expertise"
        },
        {
            icon: <Users className="w-6 h-6" />,
            label: "Team Members",
            value: "60+",
            description: "Diverse talent across all locations"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            label: "24/7 Support",
            value: "Always On",
            description: "Round-the-clock service across timezones"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: "Local Presence",
            value: "12 Countries",
            description: "Deep understanding of local markets"
        }
    ];

    return (
        <section className="bg-sudo-neutral-6 text-sudo-white-1 py-20 sm:py-24 lg:py-32">
            <div className="sudo-container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="flex flex-col justify-center items-center mx-auto w-fit mb-6">
                        <h4 className="uppercase font-bold text-sudo-purple-3">Global Presence</h4>
                        <div className="w-2/4">
                            <LineAnimation />
                        </div>
                    </div>
                    <h2 className="text-sudo-title-28 lg:text-sudo-title-48 md:leading-[60px] font-heading md:w-2/3 mx-auto text-center mb-6">
                        Where We Are Based
                    </h2>
                    <p className="text-sudo-paragraph-20 text-sudo-white-6 text-center max-w-3xl">
                        With offices across three continents, we bring global expertise with local understanding. 
                        Our distributed team ensures we&apos;re always close to our clients, no matter where they are.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-sudo-neutral-5/50 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-2xl p-6 text-center hover:bg-sudo-neutral-5/70 transition-all duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-sudo-blue-5/20 rounded-full text-sudo-blue-3">
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-sudo-header-28 font-bold mb-2">{stat.value}</h3>
                            <p className="text-sudo-paragraph-20 font-semibold text-sudo-purple-3 mb-2">{stat.label}</p>
                            <p className="text-sudo-white-6 text-sm">{stat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Locations Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {locations.map((location, index) => (
                        <div
                            key={location.id}
                            className="bg-sudo-neutral-5/30 backdrop-blur-sm border border-sudo-neutral-4/20 rounded-3xl overflow-hidden hover:bg-sudo-neutral-5/50 transition-all duration-500 transform hover:-translate-y-2"
                        >
                            {/* Map */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <LocationMap
                                    city={location.city}
                                    country={location.country}
                                    fallbackColor={location.fallbackColor}
                                    priority={index === 0}
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-sudo-neutral-6/80 to-transparent pointer-events-none" />
                                
                                {/* Location Info */}
                                <div className="absolute bottom-4 left-4 z-10">
                                    <div className="flex items-center gap-2 text-sudo-white-1">
                                        <MapPin className="w-5 h-5 text-sudo-purple-3" />
                                        <span className="font-semibold">{location.city}</span>
                                    </div>
                                    <p className="text-sudo-white-6 text-sm">{location.country}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <p className="text-sudo-white-6 leading-relaxed">
                                    {location.description}
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sudo-white-5 text-sm">Timezone:</span>
                                        <span className="text-sudo-purple-3 font-semibold">{location.timezone}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sudo-white-5 text-sm">Team Size:</span>
                                        <span className="text-sudo-blue-3 font-semibold">{location.teamSize}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sudo-white-5 text-sm">Focus:</span>
                                        <span className="text-sudo-purple-3 font-semibold text-right">{location.focus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-sudo-neutral-5/20 backdrop-blur-sm border border-sudo-neutral-4/30 rounded-3xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-sudo-header-28 font-bold mb-4">Ready to Work Together?</h3>
                        <p className="text-sudo-white-6 mb-6">
                            No matter where you are in the world, we&apos;re here to help bring your vision to life. 
                            Let&apos;s connect and start building something amazing together.
                        </p>
                        <button className="bg-gradient-to-r from-sudo-purple-5 to-sudo-blue-5 text-sudo-white-1 px-8 py-3 rounded-full font-semibold hover:from-sudo-purple-6 hover:to-sudo-blue-6 transition-all duration-300 transform hover:scale-105">
                            Get In Touch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhereWeAreBased;
