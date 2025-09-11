'use client';
import {Trash2, Eye, Calendar, Mail, Phone, FileText, Download } from 'lucide-react';
import { ApplicantResponseType, useGetApplicantList, useDeleteApplicant } from '@/hooks/applicants.hooks'
import { toast } from 'sonner';
import { useState } from 'react';

export default function ApplicantsManagementPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading } = useGetApplicantList();
  const deleteApplicantMutation = useDeleteApplicant(deleteId || '');

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        setDeleteId(id);
        await deleteApplicantMutation.mutateAsync();
        toast.success('Application deleted successfully!');
      } catch {
        toast.error('Failed to delete application');
      } finally {
        setDeleteId(null);
      }
    }
  };


  const downloadResume = (resumeUrl: string, applicantName: string) => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = `${applicantName}_resume.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sudo-neutral-5 mb-1">
                Applications Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage job applications, review resumes, and update application status
              </p>
            </div>
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
                <span className="text-sudo-neutral-4 text-sm">No applications found</span>
              </div>
            ) : (
              // Table when data is available
              <table className="w-full">
                <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Applicant</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Position</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Resume</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Applied At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((applicant: ApplicantResponseType, index: number) => (
                    <tr
                      key={applicant._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Applicant Name */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">
                            {applicant.name}
                          </div>
                          {applicant.coverLetter && (
                            <div className="text-sudo-neutral-3 text-xs mt-1 line-clamp-2">
                              {applicant.coverLetter.substring(0, 100)}...
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Mail size={12} className="text-sudo-neutral-3" />
                            <span className="text-sudo-neutral-5 text-xs">
                              {applicant.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={12} className="text-sudo-neutral-3" />
                            <span className="text-sudo-neutral-5 text-xs">
                              {applicant.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Position */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">
                            {applicant.career_details?.title || 'Position Not Found'}
                          </div>
                          {applicant.career_details?.department && (
                            <div className="text-sudo-neutral-3 text-xs mt-1">
                              {applicant.career_details.department}
                            </div>
                          )}
                          {applicant.career_details?.location && (
                            <div className="text-sudo-neutral-3 text-xs">
                              📍 {applicant.career_details.location}
                            </div>
                          )}
                        </div>
                      </td>


                      {/* Resume */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => downloadResume(applicant.resumeFile, applicant.name)}
                          className="flex items-center gap-1 p-1.5 text-sudo-blue-6 hover:bg-sudo-blue-1 rounded transition-colors"
                          title="Download Resume"
                        >
                          <FileText size={14} />
                          <Download size={12} />
                        </button>
                      </td>

                      {/* Applied At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {applicant?.createdAt
                              ? new Date(applicant.createdAt).toLocaleDateString()
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button 
                            className="p-1.5 text-sudo-blue-6 hover:bg-sudo-blue-1 rounded transition-colors"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          
                          <button 
                            onClick={() => handleDelete(applicant._id!)}
                            disabled={deleteId === applicant._id}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                            title="Delete Application"
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
              <>
                Showing {data.pagination.current_page} of {data.pagination.total_pages} pages
                ({data.pagination.total_count} total applications)
              </>
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
  )
}
