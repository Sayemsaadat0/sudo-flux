'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar } from 'lucide-react'

// Mock data for testimonials
const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechCorp Solutions",
    position: "CEO",
    rating: 5,
    status: "Published",
    date: "2024-01-15",
    content: "Sudo Flux transformed our digital presence completely. Their expertise in web development and marketing strategies helped us achieve remarkable growth.",
    featured: true
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Innovate Labs",
    position: "CTO",
    rating: 5,
    status: "Draft",
    date: "2024-01-10",
    content: "The team at Sudo Flux delivered exceptional results. Their attention to detail and innovative solutions exceeded our expectations.",
    featured: false
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Growth Marketing",
    position: "Marketing Director",
    rating: 4,
    status: "Published",
    date: "2024-01-08",
    content: "Working with Sudo Flux was a game-changer for our marketing campaigns. Their strategic approach and creative solutions drove significant results.",
    featured: true
  },
  {
    id: 4,
    name: "David Thompson",
    company: "StartupXYZ",
    position: "Founder",
    rating: 5,
    status: "Scheduled",
    date: "2024-01-20",
    content: "Sudo Flux helped us build a solid foundation for our startup. Their expertise in both development and business strategy was invaluable.",
    featured: false
  },
  {
    id: 5,
    name: "Lisa Wang",
    company: "Design Studio Pro",
    position: "Creative Director",
    rating: 5,
    status: "Published",
    date: "2024-01-05",
    content: "The design work from Sudo Flux was outstanding. They perfectly captured our vision and delivered a beautiful, functional website.",
    featured: false
  }
]

const statusColors = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-blue-100 text-blue-700"
}

export default function TestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedRating, setSelectedRating] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedTestimonials = mockTestimonials
    .filter(testimonial => {
      const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || testimonial.status === selectedStatus
      const matchesRating = selectedRating === 'All' || testimonial.rating.toString() === selectedRating
      
      return matchesSearch && matchesStatus && matchesRating
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

  const statuses = ['All', ...Array.from(new Set(mockTestimonials.map(testimonial => testimonial.status)))]
  const ratings = ['All', ...Array.from(new Set(mockTestimonials.map(testimonial => testimonial.rating.toString())))]

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
                Testimonials Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage customer testimonials and reviews
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Add New Testimonial
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
                placeholder="Search testimonials..."
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

            {/* Rating Filter */}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
            >
              {ratings.map(rating => (
                <option key={rating} value={rating}>{rating === 'All' ? 'All Ratings' : `${rating} Stars`}</option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-end text-sudo-neutral-3 text-sm">
              {filteredAndSortedTestimonials.length} of {mockTestimonials.length} testimonials
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
                      Customer
                      {sortBy === 'name' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Rating</th>
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
                {filteredAndSortedTestimonials.map((testimonial, index) => (
                  <tr key={testimonial.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-sudo-neutral-5 text-sm">{testimonial.name}</div>
                        <div className="text-sudo-neutral-4 text-xs">{testimonial.position}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-sudo-purple-1 text-sudo-purple-6 text-xs rounded-full">
                        {testimonial.company}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-sm">{testimonial.rating} ★</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[testimonial.status as keyof typeof statusColors]}`}>
                        {testimonial.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {new Date(testimonial.date).toLocaleDateString()}
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
          {filteredAndSortedTestimonials.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sudo-neutral-3">
                <Search size={32} className="mx-auto mb-3" />
                <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No testimonials found</h3>
                <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedTestimonials.length} of {mockTestimonials.length} testimonials
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
