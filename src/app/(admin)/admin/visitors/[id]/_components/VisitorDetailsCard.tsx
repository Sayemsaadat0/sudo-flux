'use client'

import { Calendar, Globe, Monitor, Smartphone, Tablet, MapPin, Clock } from 'lucide-react'
import { VisitorResponseType } from '@/hooks/visitor.hooks'

interface VisitorDetailsCardProps {
  visitor: VisitorResponseType
}

const VisitorDetailsCard = ({ visitor }: VisitorDetailsCardProps) => {
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'Mobile':
        return <Smartphone className="w-5 h-5 text-blue-600" />
      case 'Tablet':
        return <Tablet className="w-5 h-5 text-green-600" />
      default:
        return <Monitor className="w-5 h-5 text-purple-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getDeviceTypeColor = (deviceType: string) => {
    switch (deviceType) {
      case 'Mobile':
        return 'bg-blue-100 text-blue-800'
      case 'Tablet':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-purple-100 text-purple-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Session Information</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Session ID */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Session ID</span>
            </div>
            <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
              {visitor.session_id}
            </p>
          </div>

          {/* IP Address */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">IP Address</span>
            </div>
            <p className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
              {visitor.session_details.ip_address}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Location</span>
            </div>
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {visitor.session_details.location}
            </p>
          </div>

          {/* Browser Type */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Browser</span>
            </div>
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {visitor.session_details.browser_type}
            </p>
          </div>

          {/* Device Type */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {getDeviceIcon(visitor.session_details.device_type)}
              <span className="text-sm font-medium text-gray-700">Device Type</span>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDeviceTypeColor(visitor.session_details.device_type)}`}>
              {visitor.session_details.device_type}
            </span>
          </div>

          {/* Created At */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Session Started</span>
            </div>
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {visitor.created_at ? formatDate(visitor.created_at) : 'N/A'}
            </p>
          </div>

          {/* Last Updated */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Last Updated</span>
            </div>
            <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
              {visitor.updated_at ? formatDate(visitor.updated_at) : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorDetailsCard
