'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCard, { TeamMember } from '@/components/core/cards/TeamCard';
import LineAnimation from '@/components/animations/LineAnimation';

gsap.registerPlugin(ScrollTrigger);

// Mock data remains the same
const teamData: TeamMember[] = [
    {
        id: 1,
        name: 'Eleanor Vance',
        title: 'Lead Architect',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
        // description: 'Expert in scalable systems and cloud infrastructure. Passionate about building for the future.',
        socials: [
            { name: 'linkedin', url: '#' },
            { name: 'twitter', url: '#' },
        ],
    },
    {
        id: 2,
        name: 'Marcus Holloway',
        title: 'Senior Developer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
        // description: 'A master of React and Node.js, Marcus turns complex problems into elegant code.',
        socials: [
            { name: 'linkedin', url: '#' },
            { name: 'twitter', url: '#' },
        ],
    },
    {
        id: 3,
        name: 'Anya Sharma',
        title: 'UX/UI Designer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop',
        // description: 'Anya crafts intuitive and beautiful user experiences that delight and engage.',
        socials: [
            { name: 'linkedin', url: '#' },
            //   { name: 'dribbble', url: '#' },
        ],
    },
    {
        id: 4,
        name: 'David Chen',
        title: 'Project Manager',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop',
        // description: 'The organized force that keeps our projects on track and our clients happy.',
        socials: [{ name: 'linkedin', url: '#' }],
    },
];

export default function TeamSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- FIX APPLIED HERE ---
        // Pass sectionRef as the second argument to gsap.context().
        // This makes all selector animations (e.g., '.section-header')
        // scoped to this component, preventing errors and conflicts.
        const ctx = gsap.context(() => {
            // Section title reveal
            gsap.from('.section-header', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.section-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Cards reveal animation
            gsap.from('.team-card-item', {
                opacity: 0,
                y: 100,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.team-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        }, sectionRef); // <-- The magic happens here!

        return () => ctx.revert(); // Cleanup
    }, []);

    return (
        <section ref={sectionRef} className="bg-slate-50 py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* <div className="section-header mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Meet Our Leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            A dynamic group of innovators and pioneers dedicated to pushing the
            boundaries of technology and design.
          </p>
        </div> */}
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col justify-center items-center mx-auto w-fit">
                        <h4 className="uppercase font-bold">Meet Our Leadership</h4>
                        <div className="w-2/4">
                            <LineAnimation />
                        </div>
                    </div>
                    <h2 className="text-sudo-title-36 text-sudo-neutral-6 font-heading w-3/4 mx-auto text-center">   A dynamic group of innovators and pioneers dedicated to pushing the
                        boundaries of technology and design.
                    </h2>
                </div>
                <div className="team-grid grid grid-cols-1 gap-y-16 gap-x-8 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
                    {teamData.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}