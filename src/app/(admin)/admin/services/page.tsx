'use client';
import { Trash2, Eye, Calendar, Tag, Star } from 'lucide-react';
import ServiceForm from './_components/ServiceForm';
import { ServiceResponseType, useGetServiceList, useDeleteService } from '@/hooks/services.hooks';
import { toast } from "sonner";
import { useState } from 'react';

export default function ServicesManagementPage() {
  const { data, isLoading } = useGetServiceList();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleteMutation = useDeleteService(deleteId || '');

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setDeleteId(id);
        await deleteMutation.mutateAsync();
        toast.success('Service deleted successfully!');
        setDeleteId(null);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to delete service');
        setDeleteId(null);
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
                Service Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage services, their categories, and benefits
              </p>
            </div>
            <ServiceForm />
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
                <span className="text-sudo-neutral-4 text-sm">No services found</span>
              </div>
            ) : (
              // Table when data is available
            <table className="w-full">
              <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Stats</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Benefits</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((service: ServiceResponseType, index: number) => (
                    <tr
                      key={service._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                    </td>

                      {/* Title and Subtitle */}
                    <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">
                            {service.title}
                          </div>
                          <div className="text-sudo-neutral-3 text-xs mt-1">
                            {service.subTitle}
                        </div>
                      </div>
                    </td>

                      {/* Category */}
                    <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Tag size={14} className="text-sudo-neutral-3" />
                      <span className="text-sudo-neutral-5 text-sm">
                            {service.category?.name || 'N/A'}
                          </span>
                      </div>
                    </td>

                      {/* Stats */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                          <Star size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {service.statsString}
                          </span>
                      </div>
                    </td>

                      {/* Benefits */}
                    <td className="py-3 px-4">
                        <div className="max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {service.benefits?.slice(0, 2).map((benefit, benefitIndex) => (
                              <span
                                key={benefitIndex}
                                className="px-2 py-0.5 bg-sudo-white-2 text-sudo-neutral-4 text-xs rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                            {service.benefits && service.benefits.length > 2 && (
                              <span className="text-sudo-neutral-3 text-xs">
                                +{service.benefits.length - 2}
                      </span>
                            )}
                          </div>
                        </div>
                    </td>

                      {/* Created At */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                            {service?.createdAt
                              ? new Date(service.createdAt).toLocaleDateString()
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

                          <ServiceForm instance={service} />
                          
                          <button 
                            onClick={() => handleDelete(service._id!)}
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
              <>Showing {data.pagination.total_count} services</>
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