'use client';
import {Trash2, Eye, Calendar, Building2 } from 'lucide-react';
import IndustryForm from './_components/IndustryForm'
import { IndustryResponseType, useGetIndustryList, useDeleteIndustry } from '@/hooks/industries.hooks'
import { getBaseUrl } from '@/utils/getBaseUrl';
import Image from 'next/image';
import { toast } from 'sonner';

export default function IndustryManagementPage() {

  const baseUrl = getBaseUrl()
  const { data, isLoading } = useGetIndustryList()
  const deleteIndustryMutation = useDeleteIndustry('')

  const handleDelete = async (industry: IndustryResponseType) => {
    if (window.confirm('Are you sure you want to delete this industry?')) {
      try {
        await deleteIndustryMutation.mutateAsync(industry);
        toast.success('Industry deleted successfully!');
      } catch {
        toast.error('Failed to delete industry. Please try again.');
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
                Industry Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage industries and their information
              </p>
            </div>
            <IndustryForm />
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
                <span className="text-sudo-neutral-4 text-sm">No data found</span>
              </div>
            ) : (
              // Table when data is available
              <table className="w-full">
                <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Icon</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((industry: IndustryResponseType, index: number) => (
                    <tr
                      key={industry._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Icon */}
                      <td className="py-3 px-4">
                        {industry.icon ? (
                          <div className="w-12 h-12 relative rounded overflow-hidden">
                            <Image
                              src={typeof industry.icon === 'string' && industry.icon.startsWith('http') ? industry.icon : `${baseUrl}${industry.icon}`}
                              alt={industry.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-sudo-white-2 rounded flex items-center justify-center">
                            <Building2 size={20} className="text-sudo-neutral-3" />
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-sudo-neutral-5 text-sm">
                          {industry.name}
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-3 px-4">
                        <div className="text-sudo-neutral-4 text-sm max-w-xs truncate">
                          {industry.description || '-'}
                        </div>
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {industry?.createdAt
                              ? new Date(industry.createdAt).toLocaleDateString()
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

                          <IndustryForm instance={industry} />
                          
                          <button 
                            onClick={() => handleDelete(industry)}
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
            {/* Showing {data?.results?.length || 0} industries */}
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