'use client';
import { Trash2, Eye, Calendar, User, ExternalLink } from 'lucide-react';
import TeamForm from './_components/TeamForm';
import { TeamResponseType, useGetTeamList, useDeleteTeam } from '@/hooks/teams.hooks';
import { getBaseUrl } from '@/utils/getBaseUrl';
import Image from 'next/image';
import { toast } from 'sonner';

export default function TeamsManagementPage() {
  const baseUrl = getBaseUrl();
  const { data, isLoading } = useGetTeamList();
  const { mutateAsync: deleteTeam } = useDeleteTeam();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteTeam(id);
        toast.success('Team member deleted successfully!');
      } catch (error) {
        console.error('Error deleting team member:', error);
        toast.error('Failed to delete team member. Please try again.');
      }
    }
  };

  return (
    <div className="p-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sudo-neutral-5 mb-1">
                Team Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage team members, their roles, and status
              </p>
            </div>
            <TeamForm />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              // Loading state
              <div className="text-center py-10">
                <span className="text-sudo-neutral-4 text-sm">Loading...</span>
              </div>
            ) : !data?.results || data.results.length === 0 ? (
              // No data state
              <div className="text-center py-10">
                <span className="text-sudo-neutral-4 text-sm">No team members found</span>
              </div>
            ) : (
              // Table when data is available
              <table className="w-full">
                <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Photo</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">LinkedIn</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((member: TeamResponseType, index: number) => (
                    <tr
                      key={member._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                      }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Photo */}
                      <td className="py-3 px-4">
                        {member.image ? (
                          <div className="w-12 h-12 relative rounded-full overflow-hidden">
                            <Image
                              src={typeof member.image === 'string' && member.image.startsWith('http') ? member.image : `${baseUrl}${member.image}`}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-sudo-white-2 rounded-full flex items-center justify-center">
                            <User size={20} className="text-sudo-neutral-3" />
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-sudo-neutral-5 text-sm">
                          {member.name}
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-5 text-sm">
                          {member.title}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            member.status === "current"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {member.status === "current" ? "Current" : "Former"}
                        </span>
                      </td>

                      {/* LinkedIn */}
                      <td className="py-3 px-4">
                        {member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sudo-blue-6 hover:text-sudo-blue-7 transition-colors"
                          >
                            <ExternalLink size={14} />
                            <span className="text-xs">LinkedIn</span>
                          </a>
                        ) : (
                          <span className="text-sudo-neutral-3 text-xs">-</span>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {member?.createdAt
                              ? new Date(member.createdAt).toLocaleDateString()
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-sudo-blue-6 hover:bg-sudo-blue-1 rounded transition-colors">
                            <Eye size={14} />
                          </button>

                          <TeamForm instance={member} />
                          
                          <button 
                            onClick={() => handleDelete(member._id!, member.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            {data?.pagination && (
              <>Showing {data.results?.length || 0} of {data.pagination.total_count} team members</>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-sudo-white-3 rounded-lg text-sudo-neutral-3 hover:bg-sudo-white-1 transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-sudo-purple-6 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-sudo-white-3 rounded-lg text-sudo-neutral-3 hover:bg-sudo-white-1 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}