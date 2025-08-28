'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar, User } from 'lucide-react'

// Mock data for industries
const mockIndustries = [
  {
    id: 1,
    name: "Technology",
    description: "Software development, IT services, and digital solutions for tech companies",
    projects: 45,
    status: "Active",
    date: "2024-01-15",
    revenue: "$125,000",
    clients: 12,
    featured: true
  },
  {
    id: 2,
    name: "Healthcare",
    description: "Digital health solutions, medical software, and healthcare technology",
    projects: 28,
    status: "Active",
    date: "2024-01-10",
    revenue: "$89,000",
    clients: 8,
    featured: false
  },
  {
    id: 3,
    name: "E-commerce",
    description: "Online retail platforms, payment systems, and e-commerce solutions",
    projects: 32,
    status: "Active",
    date: "2024-01-08",
    revenue: "$156,000",
    clients: 15,
    featured: true
  },
  {
    id: 4,
    name: "Education",
    description: "Learning management systems, educational apps, and e-learning platforms",
    projects: 18,
    status: "Inactive",
    date: "2024-01-20",
    revenue: "$67,000",
    clients: 6,
    featured: false
  },
  {
    id: 5,
    name: "Finance",
    description: "Financial software, banking solutions, and fintech applications",
    projects: 22,
    status: "Active",
    date: "2024-01-05",
    revenue: "$203,000",
    clients: 9,
    featured: true
  }
]

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Pending: "bg-yellow-100 text-yellow-700"
}

export default function IndustryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedIndustries = mockIndustries
    .filter(industry => {
      const matchesSearch = industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           industry.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || industry.status === selectedStatus
      
      return matchesSearch && matchesStatus
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

  const statuses = ['All', ...Array.from(new Set(mockIndustries.map(industry => industry.status)))]

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
                Industry Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage industry sectors and their performance metrics
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Add New Industry
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-sudo-white-2 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sudo-neutral-3" size={16} />
              <input
                type="text"
                placeholder="Search industries..."
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

            {/* Results Count */}
            <div className="flex items-center justify-end text-sudo-neutral-3 text-sm">
              {filteredAndSortedIndustries.length} of {mockIndustries.length} industries
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
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Industry
                      {sortBy === 'name' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('projects')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Projects
                      {sortBy === 'projects' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('revenue')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Revenue
                      {sortBy === 'revenue' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Clients</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Date
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
                {filteredAndSortedIndustries.map((industry, index) => (
                  <tr key={industry.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                          <User size={14} className="text-sudo-purple-6" />
                        </div>
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">{industry.name}</div>
                          {industry.featured && (
                            <span className="text-xs text-sudo-purple-6 font-medium">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <div className="text-sudo-neutral-4 text-xs line-clamp-2">{industry.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-5 font-medium text-sm">
                        {industry.projects}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-medium text-sm">
                        {industry.revenue}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-5 font-medium text-sm">
                        {industry.clients}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[industry.status as keyof typeof statusColors]}`}>
                        {industry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {new Date(industry.date).toLocaleDateString()}
                        </span>
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
          {filteredAndSortedIndustries.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sudo-neutral-3">
                <Search size={32} className="mx-auto mb-3" />
                <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No industries found</h3>
                <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedIndustries.length} of {mockIndustries.length} industries
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
