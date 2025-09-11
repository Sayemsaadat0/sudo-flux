
import { Star, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";

export default function AboutUsBanner() {
    return (
        <section>
            {/* Hero Content */}
            <div className="sudo-container px-4 md:px-6 lg:px-8 pt-20 md:pt-24 ">
                <div className="text-center space-y-8 max-w-5xl mx-auto">
                    {/* Rating Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sudo-blue-6/30 bg-sudo-white-2 shadow-lg">
                        <div className="flex items-center gap-1">
                            <Star size={16} fill="currentColor" className="text-yellow-400" />
                            <Star size={16} fill="currentColor" className="text-yellow-400" />
                            <Star size={16} fill="currentColor" className="text-yellow-400" />
                            <Star size={16} fill="currentColor" className="text-yellow-400" />
                            <Star size={16} fill="currentColor" className="text-yellow-400" />
                        </div>
                        <span className="text-sudo-blue-6 font-semibold text-sm">4.97/5 Reviews</span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
                            <span className="block text-sudo-neutral-6">We Build</span>
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Digital Dreams
                            </span>
                        </h1>
                        
                        <div className="flex items-center justify-center gap-2 text-sudo-neutral-4">
                            <Sparkles size={20} className="text-yellow-500" />
                            <span className="text-lg md:text-xl">Into Reality</span>
                            <Sparkles size={20} className="text-yellow-500" />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sudo-paragraph-20 text-sudo-neutral-4 max-w-3xl mx-auto leading-relaxed">
                        Founded by a team of engineers and entrepreneurs, we blend technical skill with business insight to deliver solutions that are not only functional, but also aligned with your strategic goals.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Button 
                            icon={<ArrowRight size={18} />} 
                            icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100" 
                            className="text-sudo-white-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
                            label="Start Your Project" 
                        />
                        <Button 
                            className="text-sudo-neutral-6 border border-sudo-neutral-3 bg-transparent hover:bg-sudo-neutral-2 transition-all duration-300" 
                            label="Learn More" 
                        />
                    </div>

                    {/* Trust Indicators */}
                    {/* <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sudo-neutral-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-sudo-neutral-6">50+</div>
                            <div className="text-sm">Projects Delivered</div>
                        </div>
                        <div className="w-px h-8 bg-sudo-neutral-3" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-sudo-neutral-6">5+</div>
                            <div className="text-sm">Years Experience</div>
                        </div>
                        <div className="w-px h-8 bg-sudo-neutral-3" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-sudo-neutral-6">100%</div>
                            <div className="text-sm">Client Satisfaction</div>
                        </div>
                    </div> */}
                </div>
            </div>

        </section>
    );
}
