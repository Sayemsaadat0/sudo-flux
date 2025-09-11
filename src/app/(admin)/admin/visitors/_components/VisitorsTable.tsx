'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Eye, Trash2, Calendar, User, Clock, MapPin, Trash } from 'lucide-react'
import { useGetVisitors, useDeleteVisitor, useDeleteAllVisitors } from '@/hooks/visitors.hooks'
import { Session } from '@/models/Visitor'

// Utility function to calculate total duration from analytics
const calculateTotalDuration = (analytics: any[]) => {
  return analytics.reduce((total, page) => {
    return total + page.page_sections.reduce((pageTotal: number, section: any) => {
      return pageTotal + section.duration
    }, 0)
  }, 0)
}

// Format duration in seconds to readable format
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

// Format date to readable format
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

interface VisitorsTableProps {
  onView?: (session: Session) => void
}

export default function VisitorsTable({ onView }: VisitorsTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDevice, setSelectedDevice] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const { data: visitorsData, isLoading, error } = useGetVisitors(currentPage, limit)
  const deleteVisitor = useDeleteVisitor()
  const deleteAllVisitors = useDeleteAllVisitors()

  const handleDelete = async (sessionId: string) => {
    if (confirm(`Are you sure you want to delete session ${sessionId}?`)) {
      try {
        await deleteVisitor.mutateAsync(sessionId)
      } catch (error) {
        console.error('Failed to delete visitor:', error)
      }
    }
  }

  const handleDeleteAll = async () => {
    if (confirm('Are you sure you want to delete ALL visitor data? This action cannot be undone.')) {
      try {
        await deleteAllVisitors.mutateAsync()
      } catch (error) {
        console.error('Failed to delete all visitors:', error)
      }
    }
  }

  const handleViewDetails = (visitor: Session) => {
    if (onView) {
      onView(visitor)
    } else {
      // Navigate to the detailed view page using MongoDB _id
      router.push(`/admin/visitors/${(visitor as any)._id}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sudo-neutral-3">Loading visitors...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-600">Error loading visitors: {error.message}</div>
      </div>
    )
  }

  const visitors = visitorsData?.results || []
  const pagination = visitorsData?.pagination

  // Filter visitors based on search and device type
  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = 
      visitor.session_id.includes(searchTerm) ||
      visitor.session_details.ip_address.includes(searchTerm) ||
      visitor.session_details.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDevice = selectedDevice === 'All' || visitor.session_details.device_type === selectedDevice
    
    return matchesSearch && matchesDevice
  })

  const deviceTypes = ['All', 'Desktop', 'Mobile', 'Tablet']

  return (
    <div className="space-y-4">
      {/* Delete All Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDeleteAll}
          disabled={deleteAllVisitors.isPending || visitors.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash size={16} />
          {deleteAllVisitors.isPending ? 'Deleting...' : 'Delete All Visitors'}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sudo-neutral-3" size={16} />
            <input
              type="text"
              placeholder="Search by session ID, IP, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
            />
          </div>

          {/* Device Filter */}
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="px-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
          >
            {deviceTypes.map(device => (
              <option key={device} value={device}>{device}</option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-end text-sudo-neutral-3 text-sm">
            {filteredVisitors.length} of {visitors.length} visitors
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Session ID</th>
                <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Created At</th>
                <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Address</th>
                <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Device</th>
                <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor, index) => {
                const totalDuration = calculateTotalDuration(visitor.analytics)
                const deviceColors = {
                  Desktop: "bg-blue-100 text-blue-700",
                  Mobile: "bg-green-100 text-green-700",
                  Tablet: "bg-purple-100 text-purple-700"
                }

                return (
                  <tr key={visitor.session_id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    {/* Session ID */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                          <User size={14} className="text-sudo-purple-6" />
                        </div>
                        <span className="text-sudo-neutral-5 text-sm font-mono font-medium">
                          {visitor.session_id}
                        </span>
                      </div>
                    </td>

                    {/* Created At */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {visitor.created_at ? formatDate(visitor.created_at) : 'N/A'}
                        </span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {formatDuration(totalDuration)}
                        </span>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-5 text-sm font-mono">
                            {visitor.session_details.ip_address}
                          </span>
                        </div>
                        <div className="text-sudo-neutral-4 text-xs">
                          {visitor.session_details.location}
                        </div>
                      </div>
                    </td>

                    {/* Device */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${deviceColors[visitor.session_details.device_type as keyof typeof deviceColors]}`}>
                          {visitor.session_details.device_type}
                        </span>
                        <div className="text-sudo-neutral-4 text-xs">
                          {visitor.session_details.browser_type}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleViewDetails(visitor)}
                          className="p-1.5 text-sudo-blue-6 hover:bg-sudo-blue-1 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(visitor.session_id)}
                          disabled={deleteVisitor.isPending}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Session"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredVisitors.length === 0 && (
          <div className="text-center py-8">
            <div className="text-sudo-neutral-3">
              <Search size={32} className="mx-auto mb-3" />
              <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No visitors found</h3>
              <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredVisitors.length} of {pagination.total_count} visitors
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-sudo-white-3 rounded-lg text-sudo-neutral-3 hover:bg-sudo-white-1 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-sudo-neutral-5 text-sm">
              Page {currentPage} of {pagination.total_pages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(pagination.total_pages, prev + 1))}
              disabled={currentPage === pagination.total_pages}
              className="px-3 py-1.5 border border-sudo-white-3 rounded-lg text-sudo-neutral-3 hover:bg-sudo-white-1 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
