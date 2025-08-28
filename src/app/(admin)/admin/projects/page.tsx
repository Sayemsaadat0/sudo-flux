'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal,  FolderOpen } from 'lucide-react'

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    client: "TechCorp Solutions",
    category: "Web Development",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    budget: "$25,000",
    progress: 65,
    team: ["John Smith", "Sarah Johnson"],
    description: "Complete redesign of the e-commerce platform with modern UI/UX and improved functionality."
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "Innovate Labs",
    category: "Mobile Development",
    status: "Completed",
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    budget: "$18,000",
    progress: 100,
    team: ["Mike Wilson", "Emily Davis"],
    description: "Cross-platform mobile application for iOS and Android with advanced features."
  },
  {
    id: 3,
    name: "Digital Marketing Campaign",
    client: "Growth Marketing",
    category: "Digital Marketing",
    status: "Planning",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    budget: "$12,000",
    progress: 15,
    team: ["David Brown", "Lisa Wang"],
    description: "Comprehensive digital marketing campaign including SEO, PPC, and social media."
  },
  {
    id: 4,
    name: "UI/UX Design System",
    client: "Design Studio Pro",
    category: "Design",
    status: "In Progress",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    budget: "$8,500",
    progress: 40,
    team: ["Alex Chen"],
    description: "Complete design system with component library and style guidelines."
  },
  {
    id: 5,
    name: "Cloud Migration Project",
    client: "StartupXYZ",
    category: "Infrastructure",
    status: "Completed",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    budget: "$35,000",
    progress: 100,
    team: ["Robert Johnson", "Maria Garcia"],
    description: "Migration of legacy systems to cloud infrastructure with improved scalability."
  }
]

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-700",
  "Completed": "bg-green-100 text-green-700",
  "Planning": "bg-yellow-100 text-yellow-700",
  "On Hold": "bg-gray-100 text-gray-700"
}

const categoryColors = {
  "Web Development": "bg-purple-100 text-purple-700",
  "Mobile Development": "bg-blue-100 text-blue-700",
  "Digital Marketing": "bg-green-100 text-green-700",
  "Design": "bg-pink-100 text-pink-700",
  "Infrastructure": "bg-orange-100 text-orange-700"
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('startDate')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedProjects = mockProjects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]
      
      if (sortBy === 'startDate' || sortBy === 'endDate') {
        aValue = new Date(aValue as string).getTime()
        bValue = new Date(bValue as string).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const categories = ['All', ...Array.from(new Set(mockProjects.map(project => project.category)))]
  const statuses = ['All', ...Array.from(new Set(mockProjects.map(project => project.status)))]

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
                Projects Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage client projects, timelines, and team assignments
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Add New Project
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
                placeholder="Search projects..."
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
              {filteredAndSortedProjects.length} of {mockProjects.length} projects
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
                      Project
                      {sortBy === 'name' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Budget</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('startDate')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Timeline
                      {sortBy === 'startDate' && (
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
                {filteredAndSortedProjects.map((project, index) => (
                  <tr key={project.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                          <FolderOpen size={14} className="text-sudo-purple-6" />
                        </div>
                        <div>
                          <div className="font-medium text-sudo-neutral-5 text-sm">{project.name}</div>
                          <div className="text-sudo-neutral-4 text-xs line-clamp-1">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-sudo-purple-1 text-sudo-purple-6 text-xs rounded-full">
                        {project.client}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-sudo-white-2 rounded-full h-2">
                          <div 
                            className="bg-sudo-purple-6 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sudo-neutral-5 text-xs font-medium">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-medium text-sm">
                        {project.budget}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sudo-neutral-5 text-xs">
                        <div>{new Date(project.startDate).toLocaleDateString()}</div>
                        <div className="text-sudo-neutral-3">to</div>
                        <div>{new Date(project.endDate).toLocaleDateString()}</div>
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
          {filteredAndSortedProjects.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sudo-neutral-3">
                <Search size={32} className="mx-auto mb-3" />
                <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No projects found</h3>
                <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedProjects.length} of {mockProjects.length} projects
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
