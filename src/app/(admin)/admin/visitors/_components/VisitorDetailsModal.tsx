'use client'

import { MapPin, Clock, Monitor, Globe, Calendar, User } from 'lucide-react'
import { Session } from '@/models/Visitor'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface VisitorDetailsModalProps {
  visitor: Session | null
  isOpen: boolean
  onClose: () => void
}

// Format duration in seconds to readable format
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

// Format date to readable format
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export default function VisitorDetailsModal({ visitor, isOpen, onClose }: VisitorDetailsModalProps) {
  if (!visitor) return null

  const totalDuration = visitor.analytics.reduce((total, page) => {
    return total + page.page_sections.reduce((pageTotal, section) => {
      return pageTotal + section.duration
    }, 0)
  }, 0)

  const totalPages = visitor.analytics.length
  const totalSections = visitor.analytics.reduce((total, page) => total + page.page_sections.length, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl max-h-[90vh] bg-white overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-sudo-neutral-5">
            Visitor Session Details
          </DialogTitle>
          <DialogDescription className="text-sudo-neutral-3">
            Session ID: {visitor.session_id}
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Session Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-4">Session Information</h3>
              
              {/* Session ID */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                  <User size={16} className="text-sudo-purple-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Session ID</div>
                  <div className="font-mono font-medium text-sudo-neutral-5">{visitor.session_id}</div>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-blue-1 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-sudo-blue-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Created At</div>
                  <div className="font-medium text-sudo-neutral-5">{formatDate(visitor.created_at || new Date())}</div>
                </div>
              </div>

              {/* Updated At */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-green-1 rounded-full flex items-center justify-center">
                  <Clock size={16} className="text-sudo-green-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Last Updated</div>
                  <div className="font-medium text-sudo-neutral-5">{formatDate(visitor.updated_at || new Date())}</div>
                </div>
              </div>

              {/* Total Duration */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-orange-1 rounded-full flex items-center justify-center">
                  <Clock size={16} className="text-sudo-orange-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Total Duration</div>
                  <div className="font-medium text-sudo-neutral-5">{formatDuration(totalDuration)}</div>
                </div>
              </div>
            </div>

            {/* Device & Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-4">Device & Location</h3>
              
              {/* IP Address */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-red-1 rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-sudo-red-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">IP Address</div>
                  <div className="font-mono font-medium text-sudo-neutral-5">{visitor.session_details.ip_address}</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-blue-1 rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-sudo-blue-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Location</div>
                  <div className="font-medium text-sudo-neutral-5">{visitor.session_details.location}</div>
                </div>
              </div>

              {/* Device Type */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-purple-1 rounded-full flex items-center justify-center">
                  <Monitor size={16} className="text-sudo-purple-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Device Type</div>
                  <div className="font-medium text-sudo-neutral-5">{visitor.session_details.device_type}</div>
                </div>
              </div>

              {/* Browser */}
              <div className="flex items-center gap-3 p-3 bg-sudo-white-1 rounded-lg">
                <div className="w-10 h-10 bg-sudo-green-1 rounded-full flex items-center justify-center">
                  <Globe size={16} className="text-sudo-green-6" />
                </div>
                <div>
                  <div className="text-sm text-sudo-neutral-3">Browser</div>
                  <div className="font-medium text-sudo-neutral-5">{visitor.session_details.browser_type}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Summary */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-4">Analytics Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-sudo-blue-1 rounded-lg text-center">
                <div className="text-2xl font-bold text-sudo-blue-6">{totalPages}</div>
                <div className="text-sm text-sudo-neutral-3">Pages Visited</div>
              </div>
              <div className="p-4 bg-sudo-green-1 rounded-lg text-center">
                <div className="text-2xl font-bold text-sudo-green-6">{totalSections}</div>
                <div className="text-sm text-sudo-neutral-3">Sections Viewed</div>
              </div>
              <div className="p-4 bg-sudo-purple-1 rounded-lg text-center">
                <div className="text-2xl font-bold text-sudo-purple-6">{formatDuration(totalDuration)}</div>
                <div className="text-sm text-sudo-neutral-3">Total Time</div>
              </div>
            </div>
          </div>

          {/* Page Analytics Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-4">Page Analytics</h3>
            <div className="space-y-4">
              {visitor.analytics.map((page, pageIndex) => (
                <div key={pageIndex} className="border border-sudo-white-2 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sudo-neutral-5">{page.page_name}</h4>
                    <div className="text-sm text-sudo-neutral-3">
                      {page.previous_page ? `From: ${page.previous_page}` : 'Entry page'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {page.page_sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="flex items-center justify-between p-2 bg-sudo-white-1 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-sudo-neutral-5">{section.name}</span>
                          {section.previous_section && (
                            <span className="text-xs text-sudo-neutral-3">
                              ← {section.previous_section}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-sudo-neutral-4">
                          {formatDuration(section.duration)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
