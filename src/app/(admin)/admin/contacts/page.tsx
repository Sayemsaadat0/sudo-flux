'use client';
import {Trash2, Eye, Calendar, Mail, Phone, User } from 'lucide-react';
import ContactForm from './_components/ContactForm'
import { ContactResponseType, useGetContactList, useDeleteContact } from '@/hooks/contacts.hooks'
import { toast } from 'sonner';

export default function ContactManagementPage() {

  const { data, isLoading } = useGetContactList()
  const deleteContactMutation = useDeleteContact('')

  const handleDelete = async (contact: ContactResponseType) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContactMutation.mutateAsync(contact);
        toast.success('Contact deleted successfully!');
      } catch {
        toast.error('Failed to delete contact. Please try again.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-600';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-600';
      case 'resolved':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
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
                Contact Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage contact inquiries and messages
              </p>
            </div>
            <ContactForm />
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
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Contact Info</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Message</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.results.map((contact: ContactResponseType, index: number) => (
                    <tr
                      key={contact._id}
                      className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-sudo-white-1/30"
                        }`}
                    >
                      {/* Index */}
                      <td className="py-3 px-4">
                        <span className="text-sudo-neutral-4 font-medium text-sm">
                          {index + 1}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-sudo-neutral-3" />
                          <span className="font-medium text-sudo-neutral-5 text-sm">
                            {contact.name}
                          </span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Mail size={12} className="text-sudo-neutral-3" />
                            <span className="text-sudo-neutral-5 text-xs">
                              {contact.email}
                            </span>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-1">
                              <Phone size={12} className="text-sudo-neutral-3" />
                              <span className="text-sudo-neutral-5 text-xs">
                                {contact.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="py-3 px-4">
                        <div className="text-sudo-neutral-5 text-sm max-w-xs truncate">
                          {contact.subject || '-'}
                        </div>
                      </td>

                      {/* Message */}
                      <td className="py-3 px-4">
                        <div className="text-sudo-neutral-4 text-sm max-w-xs truncate">
                          {contact.message}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}
                        >
                          {getStatusText(contact.status)}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm">
                            {contact?.createdAt
                              ? new Date(contact.createdAt).toLocaleDateString()
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

                          <ContactForm instance={contact} />
                          
                          <button 
                            onClick={() => handleDelete(contact)}
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
            {/* Showing {data?.results?.length || 0} contacts */}
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