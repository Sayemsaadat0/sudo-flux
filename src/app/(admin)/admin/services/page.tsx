'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar, User } from 'lucide-react'

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "Web Development",
    description: "Custom website development with modern technologies and responsive design",
    category: "Development",
    price: "$2,500 - $15,000",
    duration: "2-8 weeks",
    status: "Active",
    date: "2024-01-15",
    featured: true,
    skills: ["React", "Node.js", "PHP", "WordPress"],
    projects: 45,
    rating: 4.8
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Cross-platform mobile applications for iOS and Android platforms",
    category: "Development",
    price: "$5,000 - $25,000",
    duration: "3-12 weeks",
    status: "Active",
    date: "2024-01-10",
    featured: true,
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
    projects: 28,
    rating: 4.9
  },
  {
    id: 3,
    name: "Digital Marketing",
    description: "Comprehensive digital marketing strategies including SEO, PPC, and social media",
    category: "Marketing",
    price: "$500 - $3,000/month",
    duration: "Ongoing",
    status: "Active",
    date: "2024-01-08",
    featured: false,
    skills: ["SEO", "Google Ads", "Facebook Ads", "Content Marketing"],
    projects: 32,
    rating: 4.7
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "User interface and user experience design with modern design systems",
    category: "Design",
    price: "$1,500 - $8,000",
    duration: "1-4 weeks",
    status: "Active",
    date: "2024-01-20",
    featured: false,
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    projects: 15,
    rating: 4.6
  },
  {
    id: 5,
    name: "Cloud Migration",
    description: "Infrastructure migration to cloud platforms with optimization",
    category: "Infrastructure",
    price: "$10,000 - $50,000",
    duration: "4-16 weeks",
    status: "Inactive",
    date: "2024-01-05",
    featured: false,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    projects: 12,
    rating: 4.5
  }
]

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Pending: "bg-yellow-100 text-yellow-700"
}

const categoryColors = {
  Development: "bg-purple-100 text-purple-700",
  Marketing: "bg-green-100 text-green-700",
  Design: "bg-pink-100 text-pink-700",
  Infrastructure: "bg-orange-100 text-orange-700"
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedServices = mockServices
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || service.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
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

  const categories = ['All', ...Array.from(new Set(mockServices.map(service => service.category)))]
  const statuses = ['All', ...Array.from(new Set(mockServices.map(service => service.status)))]

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
                Services Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage service offerings, pricing, and availability
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Add New Service
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

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
              {filteredAndSortedServices.length} of {mockServices.length} services
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
                      Service
                      {sortBy === 'name' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Skills</th>
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
                {filteredAndSortedServices.map((service, index) => (
                  <tr key={service.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                          <User size={14} className="text-sudo-purple-6" />
                        </div>
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">{service.name}</div>
                          <div className="text-sudo-neutral-4 text-xs line-clamp-1">{service.description}</div>
                          {service.featured && (
                            <span className="text-xs text-sudo-purple-6 font-medium">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[service.category as keyof typeof categoryColors]}`}>
                        {service.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-medium text-sm">
                        {service.price}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-5 text-sm">
                        {service.duration}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {service.skills.slice(0, 2).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-0.5 bg-sudo-white-2 text-sudo-neutral-4 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {service.skills.length > 2 && (
                          <span className="text-sudo-neutral-3 text-xs">+{service.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-5 font-medium text-sm">
                        {service.projects}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-sm">{service.rating} ★</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[service.status as keyof typeof statusColors]}`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {new Date(service.date).toLocaleDateString()}
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
          {filteredAndSortedServices.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sudo-neutral-3">
                <Search size={32} className="mx-auto mb-3" />
                <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No services found</h3>
                <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedServices.length} of {mockServices.length} services
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
