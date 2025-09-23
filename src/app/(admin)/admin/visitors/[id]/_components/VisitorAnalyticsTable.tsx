'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Clock, Navigation, Eye } from 'lucide-react'
import { VisitorResponseType } from '@/hooks/visitor.hooks'

interface VisitorAnalyticsTableProps {
  analytics: VisitorResponseType['analytics']
}

const VisitorAnalyticsTable = ({ analytics }: VisitorAnalyticsTableProps) => {
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set())

  const togglePageExpansion = (index: number) => {
    const newExpanded = new Set(expandedPages)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedPages(newExpanded)
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}m ${remainingSeconds}s`
    } else {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return `${hours}h ${minutes}m`
    }
  }

  const getTotalDuration = (sections: VisitorResponseType['analytics'][0]['page_sections']) => {
    return sections.reduce((total : number, section : any) => total + section.duration, 0)
  }

  const getPageIcon = (pageName: string) => {
    if (pageName.includes('home')) return '🏠'
    if (pageName.includes('about')) return 'ℹ️'
    if (pageName.includes('contact')) return '📞'
    if (pageName.includes('service')) return '⚙️'
    if (pageName.includes('blog')) return '📝'
    if (pageName.includes('portfolio')) return '💼'
    if (pageName.includes('pricing')) return '💰'
    return '📄'
  }

  const getSectionIcon = (sectionName: string) => {
    if (sectionName.includes('hero')) return '🎯'
    if (sectionName.includes('about')) return 'ℹ️'
    if (sectionName.includes('contact')) return '📞'
    if (sectionName.includes('service')) return '⚙️'
    if (sectionName.includes('testimonial')) return '💬'
    if (sectionName.includes('faq')) return '❓'
    if (sectionName.includes('cta')) return '📢'
    if (sectionName.includes('blog')) return '📝'
    if (sectionName.includes('load')) return '⏳'
    if (sectionName.includes('view')) return '👁️'
    return '📍'
  }

  if (!analytics || analytics.length === 0) {
    return (
      <div className="text-center py-8">
        <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No analytics data available for this visitor</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {analytics.map((page : any, pageIndex : any) => { 
        const isExpanded = expandedPages.has(pageIndex)
        const totalPageDuration = getTotalDuration(page.page_sections)
        
        return (
          <div key={pageIndex} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Page Header */}
            <div 
              className="bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => togglePageExpansion(pageIndex)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-lg">{getPageIcon(page.page_name)}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {page.page_name.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </h3>
                    {page.previous_page && (
                      <p className="text-sm text-gray-500">
                        From: {page.previous_page.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(totalPageDuration)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {page.page_sections.length} section{page.page_sections.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Page Sections */}
            {isExpanded && (
              <div className="bg-white">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span>Page Sections</span>
                  </h4>
                </div>
                <div className="divide-y divide-gray-100">
                  {page.page_sections.map((section : any, sectionIndex : any  ) => (
                    <div key={sectionIndex} className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getSectionIcon(section.name)}</span>
                          <div>
                            <p className="font-medium text-gray-900">
                              {section.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </p>
                            {section.previous_section && (
                              <p className="text-sm text-gray-500">
                                From: {section.previous_section.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(section.duration)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Session Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Total Pages Visited:</span>
            <span className="ml-2 text-blue-900">{analytics.length}</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Total Sections:</span>
            <span className="ml-2 text-blue-900">
              {analytics.reduce((total, page) => total + page.page_sections.length, 0)}
            </span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Total Time:</span>
            <span className="ml-2 text-blue-900">
              {formatDuration(
                analytics.reduce((total, page) => 
                  total + getTotalDuration(page.page_sections), 0
                )
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorAnalyticsTable