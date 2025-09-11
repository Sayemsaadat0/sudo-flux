import TeamCard, { TeamMember } from '@/components/core/cards/TeamCard';
import LineAnimation from '@/components/animations/LineAnimation';
import { useGetTeamList } from '@/hooks/teams.hooks';

export default function TeamSection() {
  const { data: teamsResponse, isLoading, error } = useGetTeamList();
  const teams = teamsResponse?.data?.data || [];

  // Transform API data to match TeamCard interface
  const transformedTeams: TeamMember[] = teams?.map((team: any) => ({
    id: team._id,
    name: team.name,
    title: team.title,
    image: team.image,
    socials: team.socials,
  })) || [];

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
        {transformedTeams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {transformedTeams.map((member) => (
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
          <button className="inline-flex items-center px-6 py-3 bg-sudo-neutral-6 text-sudo-white-1 rounded-lg hover:bg-sudo-neutral-5 transition-colors duration-300 font-medium">
            View Open Positions
          </button>
        </div>
      </div>
    </section>
  );
}
