'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Linkedin, Twitter, Github } from 'lucide-react';

// Define the type for a single team member
export interface TeamMember {
    id: number;
    name: string;
    title: string;
    image: string;
    socials: {
        name: 'linkedin' | 'twitter' | 'github';
        url: string;
    }[];
}

// Map social names to Lucide icon components
const socialIconMap = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
};

interface TeamCardProps {
    member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // GSAP Context for proper cleanup in React
        const ctx = gsap.context(() => {
            const socialIcons = gsap.utils.toArray('.social-icon');

            const tl = gsap.timeline({ paused: true });

            tl.to(card, {
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                duration: 0.4,
                ease: 'power2.out',
            }).to(
                socialIcons,
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.3,
                    ease: 'power2.out',
                },
                '-=0.3' // Start this animation slightly before the previous one ends
            );

            const handleMouseEnter = () => tl.play();
            const handleMouseLeave = () => tl.reverse();

            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                // Cleanup function
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
                tl.kill(); // Kill the timeline to prevent memory leaks
            };
        }, cardRef);

        return () => ctx.revert(); // Revert all GSAP animations
    }, []);

    return (
        <div
            ref={cardRef}
            className="team-card-item relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-800 shadow-lg transform-gpu transition-transform duration-300"
        >
            <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-sm font-light text-sky-200">{member.title}</p>
                <div className="mt-4 flex space-x-3">
                    {member.socials.map((social) => {
                        const Icon = socialIconMap[social.name];
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon transform translate-y-8 opacity-0"
                            >
                                <Icon className="h-6 w-6 text-slate-300 hover:text-sky-400 transition-colors" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}