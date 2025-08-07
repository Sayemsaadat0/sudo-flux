'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCard, { TeamMember } from '@/components/core/cards/TeamCard';
import LineAnimation from '@/components/animations/LineAnimation';

gsap.registerPlugin(ScrollTrigger);

// --- Team Data ---
const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Eleanor Vance',
    title: 'Lead Architect',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
    socials: [
      { name: 'linkedin', url: '#' },
      { name: 'twitter', url: '#' },
    ],
  },
  {
    id: 2,
    name: 'Marcus Holloway',
    title: 'Senior Developer',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
    socials: [
      { name: 'linkedin', url: '#' },
      { name: 'twitter', url: '#' },
    ],
  },
  {
    id: 3,
    name: 'Anya Sharma',
    title: 'UX/UI Designer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop',
    socials: [{ name: 'linkedin', url: '#' }],
  },
  {
    id: 4,
    name: 'David Chen',
    title: 'Project Manager',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop',
    socials: [{ name: 'linkedin', url: '#' }],
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
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

      // Animate each team card
      const cards = gsap.utils.toArray('.team-card-item') as HTMLElement[];

      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-50 pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center mx-auto w-fit">
            <h4 className="uppercase font-bold">Meet Our Leadership</h4>
            <div className="w-2/4">
              <LineAnimation />
            </div>
          </div>
          <h2 className="text-sudo-title-36 text-sudo-neutral-6 font-heading w-3/4 mx-auto text-center">
            A dynamic group of innovators and pioneers dedicated to pushing the
            boundaries of technology and design.
          </h2>
        </div>

        {/* Team Cards */}
        <div className="team-grid grid grid-cols-1 gap-y-16 gap-x-8 justify-items-center sm:grid-cols-2 lg:grid-cols-4 mt-16">
          {teamData.map((member) => (
            <div key={member.id} className="team-card-item w-full">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
