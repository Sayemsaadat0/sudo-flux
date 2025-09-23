import TeamCard, { TeamMember } from '@/components/core/cards/TeamCard';
import LineAnimation from '@/components/animations/LineAnimation';
import { useGetTeamList } from '@/hooks/teams.hooks';
import Link from 'next/link';

export default function TeamSection() {
  const { data: teamsResponse, isLoading, error } = useGetTeamList();
  const teams = teamsResponse?.results || [];

  // Debug logging (remove in production)
  console.log('TeamSection - isLoading:', isLoading);
  console.log('TeamSection - error:', error);
  console.log('TeamSection - teamsResponse:', teamsResponse);
  console.log('TeamSection - teams:', teams);

  // Transform API data to match TeamCard interface
  const transformedTeams: TeamMember[] = teams?.map((team: any) => ({
    id: team._id,
    name: team.name,
    title: team.title,
    image: team.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    socials: team.linkedin ? [
      {
        name: 'linkedin' as const,
        url: team.linkedin
      }
    ] : [],
  })) || [];

  // Fallback sample data for testing (remove when real data is available)
  const sampleTeams: TeamMember[] = [
    {
      id: "sample-1",
      name: "John Doe",
      title: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      socials: [
        { name: 'linkedin', url: 'https://linkedin.com/in/johndoe' }
      ]
    },
    {
      id: "sample-2", 
      name: "Jane Smith",
      title: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      socials: [
        { name: 'linkedin', url: 'https://linkedin.com/in/janesmith' }
      ]
    },
    {
      id: "sample-3",
      name: "Mike Johnson", 
      title: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      socials: [
        { name: 'linkedin', url: 'https://linkedin.com/in/mikejohnson' }
      ]
    },
    {
      id: "sample-4",
      name: "Sarah Wilson",
      title: "Design Director", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      socials: [
        { name: 'linkedin', url: 'https://linkedin.com/in/sarahwilson' }
      ]
    }
  ];

  // Use sample data if no real data is available
  const displayTeams = transformedTeams.length > 0 ? transformedTeams : sampleTeams;

  if (isLoading) {
    return (
      <section className="bg-sudo-white-1 py-24 md:py-32">
        <div className="sudo-container px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-sudo-neutral-4">Loading team members...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-sudo-white-1 py-24 md:py-32">
        <div className="sudo-container px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-red-600">Failed to load team members</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sudo-white-1 py-24 md:py-32">
      <div className="sudo-container px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex flex-col items-center mb-8">
            <h4 className="uppercase font-bold text-sudo-neutral-4 text-sm tracking-wider mb-4">
              Meet Our Leadership
            </h4>
            <div className="w-20">
              <LineAnimation />
            </div>
          </div>
          
          <h2 className="text-sudo-title-28 md:text-sudo-title-36 lg:text-sudo-title-48 text-sudo-neutral-6 font-heading leading-tight max-w-4xl mx-auto mb-6">
            A dynamic group of innovators and pioneers dedicated to pushing the
            boundaries of technology and design.
          </h2>
          
          <p className="text-sudo-paragraph-18 text-sudo-neutral-4 max-w-2xl mx-auto leading-relaxed">
            Our diverse team brings together expertise from across the globe, united by a shared passion for creating exceptional digital experiences.
          </p>
        </div>

        {/* Team Cards Grid */}
        {displayTeams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {displayTeams.map((member) => (
              <div key={member.id} className="w-full">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sudo-neutral-4">No team members found.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-sudo-neutral-4 mb-6">
            Want to join our team?
          </p>
          <Link href="/careers">
            <button className="inline-flex items-center px-6 py-3 bg-sudo-neutral-6 text-sudo-white-1 rounded-lg hover:bg-sudo-neutral-5 transition-colors duration-300 font-medium">
              View Open Positions
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
