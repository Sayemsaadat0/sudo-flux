'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar, User } from 'lucide-react'

// Mock data for contacts
const mockContacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    subject: "Website Development Inquiry",
    status: "New",
    date: "2024-01-15",
    message: "I'm interested in discussing a new website development project for our company. Could we schedule a consultation?",
    priority: "High"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@innovate.com",
    phone: "+1 (555) 987-6543",
    company: "Innovate Labs",
    subject: "Digital Marketing Services",
    status: "In Progress",
    date: "2024-01-14",
    message: "We're looking to improve our digital marketing strategy and would like to explore your services.",
    priority: "Medium"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@startup.com",
    phone: "+1 (555) 456-7890",
    company: "StartupXYZ",
    subject: "UI/UX Design Project",
    status: "Completed",
    date: "2024-01-12",
    message: "Thank you for the excellent work on our UI/UX design project. The results exceeded our expectations!",
    priority: "Low"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@designpro.com",
    phone: "+1 (555) 321-6540",
    company: "Design Studio Pro",
    subject: "Partnership Discussion",
    status: "New",
    date: "2024-01-16",
    message: "We'd like to discuss potential partnership opportunities between our companies.",
    priority: "High"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@marketing.com",
    phone: "+1 (555) 789-0123",
    company: "Growth Marketing",
    subject: "SEO Services Inquiry",
    status: "In Progress",
    date: "2024-01-13",
    message: "We need help with our SEO strategy and would like to learn more about your services.",
    priority: "Medium"
  }
]

const statusColors = {
  New: "bg-blue-100 text-blue-700",
  "In Progress": "bg-orange-100 text-orange-700",
  Completed: "bg-green-100 text-green-700"
}

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700"
}

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort data
  const filteredAndSortedContacts = mockContacts
    .filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || contact.status === selectedStatus
      const matchesPriority = selectedPriority === 'All' || contact.priority === selectedPriority
      
      return matchesSearch && matchesStatus && matchesPriority
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

  const statuses = ['All', ...Array.from(new Set(mockContacts.map(contact => contact.status)))]
  const priorities = ['All', ...Array.from(new Set(mockContacts.map(contact => contact.priority)))]

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
                Contacts Management
              </h1>
              <p className="text-sudo-neutral-3 text-sm">
                Manage customer inquiries and contact requests
              </p>
            </div>
            <button className="bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 text-sm">
              <Plus size={16} />
              Add New Contact
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
                placeholder="Search contacts..."
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

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-sudo-white-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sudo-purple-6 focus:border-transparent text-sm"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-end text-sudo-neutral-3 text-sm">
              {filteredAndSortedContacts.length} of {mockContacts.length} contacts
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
                      Contact
                      {sortBy === 'name' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-sudo-neutral-5 text-sm">Priority</th>
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
                {filteredAndSortedContacts.map((contact, index) => (
                  <tr key={contact.id} className={`border-b border-sudo-white-1 hover:bg-sudo-white-1 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-sudo-white-1/30'}`}>
                    <td className="py-3 px-4">
                      <span className="text-sudo-neutral-4 font-medium text-sm">{index + 1}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-sudo-neutral-5 text-sm">{contact.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <User size={10} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-4 text-xs">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <User size={10} className="text-sudo-neutral-3" />
                          <span className="text-sudo-neutral-4 text-xs">{contact.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-sudo-purple-1 text-sudo-purple-6 text-xs rounded-full">
                        {contact.company}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-sudo-neutral-5 text-sm">{contact.subject}</div>
                        <div className="text-sudo-neutral-4 text-xs mt-1 line-clamp-2">{contact.message}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[contact.priority as keyof typeof priorityColors]}`}>
                        {contact.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[contact.status as keyof typeof statusColors]}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-sudo-neutral-3" />
                        <span className="text-sudo-neutral-5 text-sm">
                          {new Date(contact.date).toLocaleDateString()}
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
          {filteredAndSortedContacts.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sudo-neutral-3">
                <Search size={32} className="mx-auto mb-3" />
                <h3 className="text-base font-medium text-sudo-neutral-5 mb-1">No contacts found</h3>
                <p className="text-sudo-neutral-3 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sudo-neutral-3 text-sm">
            Showing {filteredAndSortedContacts.length} of {mockContacts.length} contacts
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
