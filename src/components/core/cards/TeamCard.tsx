'use client';

import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, Github } from 'lucide-react';

// Define the type for a single team member
export interface TeamMember {
    id: string | number;
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
    return (
        <div className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl">
            <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-all duration-500 group-hover:brightness-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold transition-all duration-300 group-hover:text-sky-200">
                    {member.name}
                </h3>
                <p className="text-sm font-light text-sky-200 transition-all duration-300 group-hover:text-sky-100">
                    {member.title}
                </p>
                
                {/* Social Links */}
                <div className="mt-4 flex space-x-3">
                    {member.socials.map((social) => {
                        const Icon = socialIconMap[social.name];
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-slate-300 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:shadow-lg"
                            >
                                <Icon className="h-5 w-5" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}