'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar, User } from 'lucide-react'

// Mock data for visitors
const mockVisitors = [
  {
    id: 1,
    ipAddress: "192.168.1.100",
    location: "New York, USA",
    device: "Desktop",
    browser: "Chrome",
    os: "Windows 10",
    page: "/",
    duration: "5m 32s",
    date: "2024-01-15",
    time: "14:30:25",
    referrer: "Google",
    status: "Active",
    visits: 3
  },
  {
    id: 2,
    ipAddress: "203.45.67.89",
    location: "London, UK",
    device: "Mobile",
    browser: "Safari",
    os: "iOS 17",
    page: "/services",
    duration: "2m 15s",
    date: "2024-01-15",
    time: "13:45:12",
    referrer: "Direct",
    status: "Active",
    visits: 1
  },
  {
    id: 3,
    ipAddress: "98.76.54.32",
    location: "Toronto, Canada",
    device: "Desktop",
    browser: "Firefox",
    os: "macOS",
    page: "/portfolio",
    duration: "8m 45s",
    date: "2024-01-15",
    time: "12:20:33",
    referrer: "LinkedIn",
    status: "Active",
    visits: 2
  },
  {
    id: 4,
    ipAddress: "45.67.89.123",
    location: "Sydney, Australia",
    device: "Tablet",
    browser: "Chrome",
    os: "Android",
    page: "/contact",
    duration: "1m 20s",
    date: "2024-01-15",
    time: "11:15:48",
    referrer: "Facebook",
    status: "Inactive",
    visits: 1
  },
  {
    id: 5,
    ipAddress: "123.45.67.89",
    location: "Berlin, Germany",
    device: "Desktop",
    browser: "Edge",
    os: "Windows 11",
    page: "/about",
    duration: "12m 30s",
    date: "2024-01-15",
    time: "10:05:17",
    referrer: "Twitter",
    status: "Active",
    visits: 5
  }
]

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Blocked: "bg-red-100 text-red-700"
}

const deviceColors = {
  Desktop: "bg-blue-100 text-blue-700",
  Mobile: "bg-green-100 text-green-700",
  Tablet: "bg-purple-100 text-purple-700"
}

export default function VisitorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedDevice, setSelectedDevice] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedVisitors = mockVisitors
    .filter(visitor => {
      const matchesSearch = visitor.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           visitor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           visitor.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           visitor.referrer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || visitor.status === selectedStatus
      const matchesDevice = selectedDevice === 'All' || visitor.device === selectedDevice
      
      return matchesSearch && matchesStatus && matchesDevice
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]
      
      if (sortBy === 'date') {
        aValue = new Date(aValue as string).getTime()
        bValue = new Date(bValue as string).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const statuses = ['All', ...Array.from(new Set(mockVisitors.map(visitor => visitor.status)))]
  const devices = ['All', ...Array.from(new Set(mockVisitors.map(visitor => visitor.device)))]

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-sudo-neutral-5 mb-1">
                Visitors Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Monitor website visitors, analytics, and user behavior
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Export Data
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sudo-neutral-3" size={16} />
              <input
                type="text"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Device Filter */}
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
            >
              {devices.map(device => (
                <option key={device} value={device}>{device}</option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-end text-sudo-neutral-3 text-sm">
              {filteredAndSortedVisitors.length} of {mockVisitors.length} visitors
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sudo-white-1 border-b border-sudo-white-2">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">IP Address</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Device</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Page</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Referrer</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Date/Time
                      {sortBy === 'date' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedVisitors.map((visitor, index) => (
                  <tr key={visitor.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                          <User size={14} className="text-sudo-purple-6" />
                        </div>
                        <span className="text-sudo-neutral-5 text-sm font-mono">{visitor.ipAddress}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">{visitor.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className={`px-2 py-1 text-xs rounded-full ${deviceColors[visitor.device as keyof typeof deviceColors]}`}>
                          {visitor.device}
                        </span>
                        <div className="text-sudo-neutral-4 text-xs mt-1">
                          {visitor.browser} • {visitor.os}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-5 text-sm font-medium">
                        {visitor.page}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-5 text-sm">
                        {visitor.duration}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-sudo-purple-1 text-sudo-purple-6 text-xs rounded-full">
                        {visitor.referrer}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[visitor.status as keyof typeof statusColors]}`}>
                        {visitor.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sudo-neutral-5 text-xs">
                        <div>{new Date(visitor.date).toLocaleDateString()}</div>
                        <div className="text-sudo-neutral-3">{visitor.time}</div>
                        <div className="text-sudo-neutral-4">({visitor.visits} visits)</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-sudo-blue-6 hover:bg-sudo-blue-1 rounded transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 text-sudo-purple-6 hover:bg-sudo-purple-1 rounded transition-colors">
                          <Edit size={14} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={14} />
                        </button>
                        <button className="p-1.5 text-sudo-neutral-3 hover:bg-sudo-white-2 rounded transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAndSortedVisitors.length === 0 && (
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
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedVisitors.length} of {mockVisitors.length} visitors
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
