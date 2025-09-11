'use client';
import {Trash2, Eye, Calendar, MapPin, Building } from 'lucide-react';
import CareerForm from './_components/CareerForm'
import { CareerResponseType, useGetCareerList, useDeleteCareer } from '@/hooks/careers.hooks'
import { toast } from 'sonner';
import { useState } from 'react';

export default function CareersManagementPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading } = useGetCareerList();
  const deleteCareerMutation = useDeleteCareer(deleteId || '');

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this career position?')) {
      try {
        setDeleteId(id);
        await deleteCareerMutation.mutateAsync();
        toast.success('Career position deleted successfully!');
      } catch {
        toast.error('Failed to delete career position');
      } finally {
        setDeleteId(null);
      }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'bg-green-100 text-green-600';
      case 'part_time':
        return 'bg-blue-100 text-blue-600';
      case 'contract':
        return 'bg-purple-100 text-purple-600';
      case 'internship':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time':
        return 'Full Time';
      case 'part_time':
        return 'Part Time';
      case 'contract':
        return 'Contract';
      case 'internship':
        return 'Internship';
      default:
        return type;
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
                Career Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage job positions, requirements, and applications
              </p>
            </div>
            <CareerForm />
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
                <span className="text-sudo-neutral-4 text-sm">No career positions found</span>
              </div>
            ) : (
              // Table when data is available
              <table className="w-full">
                <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Position</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((career: CareerResponseType, index: number) => (
                    <tr
                      key={career._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Position */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">
                            {career.title}
                          </div>
                          <div className="text-sudo-neutral-3 text-xs mt-1 line-clamp-2">
                            {career.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Building size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {career.department || 'N/A'}
                          </span>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {career.location || 'N/A'}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getTypeColor(career.type || 'full_time')}`}
                        >
                          {getTypeLabel(career.type || 'full_time')}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${career.status === 'open'
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            }`}
                        >
                          {career.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {career?.createdAt
                              ? new Date(career.createdAt).toLocaleDateString()
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

                          <CareerForm instance={career} />
                          
                          <button 
                            onClick={() => handleDelete(career._id!)}
                            disabled={deleteId === career._id}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
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
                ({data.pagination.total_count} total positions)
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
