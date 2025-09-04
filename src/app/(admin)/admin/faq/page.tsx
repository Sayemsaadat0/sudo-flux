'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar } from 'lucide-react'

// Mock data for FAQ
const mockFAQs = [
  {
    id: 1,
    question: "What services does Sudo Flux offer?",
    answer: "Sudo Flux offers comprehensive web development, digital marketing, UI/UX design, and consulting services to help businesses grow their digital presence.",
    category: "Services",
    status: "Published",
    date: "2024-01-15",
    author: "Admin",
    views: 1247,
    helpful: 89
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during consultation.",
    category: "Timeline",
    status: "Published",
    date: "2024-01-10",
    author: "Admin",
    views: 856,
    helpful: 67
  },
  {
    id: 3,
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer various support packages including maintenance, updates, and technical support to ensure your digital assets continue performing optimally.",
    category: "Support",
    status: "Draft",
    date: "2024-01-08",
    author: "Admin",
    views: 0,
    helpful: 0
  },
  {
    id: 4,
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on requirements, complexity, and timeline. We provide detailed quotes after understanding your specific needs.",
    category: "Pricing",
    status: "Scheduled",
    date: "2024-01-20",
    author: "Admin",
    views: 0,
    helpful: 0
  },
  {
    id: 5,
    question: "Can you work with existing systems?",
    answer: "Absolutely! We can integrate with your existing systems, databases, and third-party services to ensure seamless functionality and data flow.",
    category: "Integration",
    status: "Published",
    date: "2024-01-05",
    author: "Admin",
    views: 1892,
    helpful: 156
  }
]

const statusColors = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-blue-100 text-blue-700"
}

const categoryColors = {
  Services: "bg-purple-100 text-purple-700",
  Timeline: "bg-blue-100 text-blue-700",
  Support: "bg-green-100 text-green-700",
  Pricing: "bg-orange-100 text-orange-700",
  Integration: "bg-pink-100 text-pink-700"
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedFAQs = mockFAQs
    .filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || faq.status === selectedStatus
      
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

  const categories = ['All', ...Array.from(new Set(mockFAQs.map(faq => faq.category)))]
  const statuses = ['All', ...Array.from(new Set(mockFAQs.map(faq => faq.status)))]

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
                FAQ Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage frequently asked questions and answers
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Add New FAQ
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
                placeholder="Search FAQs..."
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
              {filteredAndSortedFAQs.length} of {mockFAQs.length} FAQs
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
                      onClick={() => handleSort('question')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Question
                      {sortBy === 'question' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">
                    <button 
                      onClick={() => handleSort('views')}
                      className="flex items-center gap-1 hover:text-sudo-purple-6 transition-colors"
                    >
                      Views
                      {sortBy === 'views' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
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
                {filteredAndSortedFAQs.map((faq, index) => (
                  <tr key={faq.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-sudo-neutral-5 text-sm">{faq.question}</div>
                        <div className="text-sudo-neutral-4 text-xs mt-1 line-clamp-2">{faq.answer}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[faq.category as keyof typeof categoryColors]}`}>
                        {faq.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[faq.status as keyof typeof statusColors]}`}>
                        {faq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sudo-neutral-5 font-medium text-sm">
                          {faq.views.toLocaleString()}
                        </span>
                        <span className="text-sudo-neutral-3 text-xs">({faq.helpful} helpful)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {new Date(faq.date).toLocaleDateString()}
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
          {filteredAndSortedFAQs.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sudo-neutral-3">
                <Search size={32} className="mx-auto mb-3" />
                <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No FAQs found</h3>
                <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedFAQs.length} of {mockFAQs.length} FAQs
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
