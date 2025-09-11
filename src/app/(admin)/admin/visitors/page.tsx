'use client'

import { Download } from 'lucide-react'
import VisitorsTable from './_components/VisitorsTable'

export default function VisitorsPage() {

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
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>

        {/* Visitors Table */}
        <VisitorsTable />
      </div>
    </div>
  )
}
