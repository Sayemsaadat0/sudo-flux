'use client';
import { Trash2, Eye, Calendar, User, Phone, Building, DollarSign, Clock } from 'lucide-react';
import ConsultationForm from './_components/ConsultationForm';
import { ConsultationResponseType, useGetConsultationList, useDeleteConsultation } from '@/hooks/consultations.hooks';
import { toast } from "sonner";
import { useState } from 'react';

export default function ConsultationsManagementPage() {
  const { data, isLoading } = useGetConsultationList();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteMutation = useDeleteConsultation(deleteId || '');

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      try {
        setDeleteId(id);
        await deleteMutation.mutateAsync();
        toast.success('Consultation deleted successfully!');
        setDeleteId(null);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to delete consultation');
        setDeleteId(null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-600';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
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
                Consultation Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage consultation requests and track project inquiries
              </p>
            </div>
            <ConsultationForm />
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
                <span className="text-sudo-neutral-4 text-sm">No consultations found</span>
              </div>
            ) : (
              // Table when data is available
              <table className="w-full">
                <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Project Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Budget</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Timeline</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((consultation: ConsultationResponseType, index: number) => (
                    <tr
                      key={consultation._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Client Info */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User size={14} className="text-sudo-neutral-3" />
                            <span className="font-medium text-sudo-neutral-5 text-sm">
                              {consultation.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Phone size={12} className="text-sudo-neutral-3" />
                            <span className="text-sudo-neutral-4 text-xs">
                              {consultation.phone}
                            </span>
                          </div>
                          {consultation.company && (
                            <div className="flex items-center gap-2">
                              <Building size={12} className="text-sudo-neutral-3" />
                              <span className="text-sudo-neutral-4 text-xs">
                                {consultation.company}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Project Type */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-5 text-sm capitalize">
                          {consultation.projectType.replace('-', ' ')}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {consultation.budget.replace('-', ' - ').replace('k', 'K').replace('under', 'Under')}
                          </span>
                        </div>
                      </td>

                      {/* Timeline */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm capitalize">
                            {consultation.timeline.replace('-', ' ')}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(consultation.status)}`}
                        >
                          {getStatusText(consultation.status)}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {consultation?.createdAt
                              ? new Date(consultation.createdAt).toLocaleDateString()
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

                          <ConsultationForm instance={consultation} />
                          
                          <button 
                            onClick={() => handleDelete(consultation._id!)}
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
              <>Showing {data.pagination.total_count} consultations</>
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
