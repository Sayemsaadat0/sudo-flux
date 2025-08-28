'use client'

import { useState } from 'react'

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced administrator with expertise in managing digital platforms and content.'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sudo-neutral-5 mb-2">
            Profile
          </h1>
          <p className="text-sudo-neutral-3">
            Manage your account settings and profile information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-sudo-neutral-5">
                Admin User
              </h2>
              <p className="text-sudo-neutral-3">
                Administrator
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-sudo-neutral-4 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-sudo-white-3 rounded-lg focus:ring-2 focus:ring-sudo-purple-3 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sudo-neutral-4 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-sudo-white-3 rounded-lg focus:ring-2 focus:ring-sudo-purple-3 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sudo-neutral-4 mb-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 border border-sudo-white-3 rounded-lg bg-sudo-white-1 text-sudo-neutral-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sudo-neutral-4 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-sudo-white-3 rounded-lg focus:ring-2 focus:ring-sudo-purple-3 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-sudo-neutral-4 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-sudo-white-3 rounded-lg focus:ring-2 focus:ring-sudo-purple-3 focus:border-transparent"
            />
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button 
              type="button"
              className="px-6 py-3 border border-sudo-white-3 rounded-lg text-sudo-neutral-4 hover:bg-sudo-white-1 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 text-white rounded-lg hover:from-sudo-purple-7 hover:to-sudo-blue-7 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
