'use client'

import { useGetCrudLengthStats } from '@/hooks/crudStats.hooks';
import { FileText, Building2, Users, HelpCircle } from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const visitorData = [
  { month: 'Jan', visitors: 1200 },
  { month: 'Feb', visitors: 1400 },
  { month: 'Mar', visitors: 1600 },
  { month: 'Apr', visitors: 1800 },
  { month: 'May', visitors: 2200 },
  { month: 'Jun', visitors: 2400 },
  { month: 'Jul', visitors: 2800 },
  { month: 'Aug', visitors: 3200 },
  { month: 'Sep', visitors: 3600 },
  { month: 'Oct', visitors: 4000 },
  { month: 'Nov', visitors: 4200 },
  { month: 'Dec', visitors: 4500 }
]

const mostVisitedPages = [
  { page: 'Home', visits: 15420 },
  { page: 'Services', visits: 12340 },
  { page: 'About', visits: 8560 },
  { page: 'Contact', visits: 6540 },
  { page: 'Portfolio', visits: 5430 },
  { page: 'Blog', visits: 4320 }
]

const mostVisitedSections = [
  { section: 'Hero Section', avgTime: '2m 45s' },
  { section: 'Services Overview', avgTime: '3m 12s' },
  { section: 'Portfolio Gallery', avgTime: '4m 30s' },
  { section: 'Contact Form', avgTime: '2m 18s' },
  { section: 'Blog Posts', avgTime: '5m 45s' }
]

export default function AdminDashboard() {
  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  const { data: crudStats, isLoading: statsLoading } = useGetCrudLengthStats();

  // ============================================================================
  // CALCULATIONS
  // ============================================================================
  const maxVisitors = Math.max(...visitorData.map(item => item.visitors))

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  // CRUD Stats cards
  const renderCrudStatsCards = () => {
    if (statsLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const stats = crudStats?.data || { blogs: 0, industries: 0, contacts: 0, faqs: 0, total: 0 };

    const statCards = [
      {
        title: 'Blogs',
        count: stats.blogs,
        icon: FileText,
        gradient: 'from-blue-500 to-blue-600',
        bgGradient: 'from-blue-50 to-blue-400'
      },
      {
        title: 'Industries',
        count: stats.industries,
        icon: Building2,
        gradient: 'from-purple-500 to-purple-600',
        bgGradient: 'from-purple-50 to-purple-400'
      },
      {
        title: 'Contacts',
        count: stats.contacts,
        icon: Users,
        gradient: 'from-green-500 to-green-600',
        bgGradient: 'from-green-50 to-green-400'
      },
      {
        title: 'FAQs',
        count: stats.faqs,
        icon: HelpCircle,
        gradient: 'from-orange-500 to-orange-600',
        bgGradient: 'from-orange-50 to-orange-300'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className={`bg-gradient-to-br ${card.bgGradient} rounded-xl shadow-sm border border-white/50 p-6 hover:shadow-lg transition-all duration-300 group`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1 group-hover:scale-105 transition-transform duration-300">
                  {card.count.toLocaleString()}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }



  // Visitors chart
  const renderVisitorsChart = () => (
    <div className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6">
      <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-6">Visitors Growth</h3>
      
      <div className="h-48 flex items-end justify-between space-x-2">
        {visitorData.slice(-6).map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-sudo-purple-6 to-sudo-blue-6 rounded-t-lg"
              style={{ height: `${(item.visitors / maxVisitors) * 150}px` }}
            ></div>
            <span className="text-xs text-sudo-neutral-3 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // Most visited pages
  const renderMostVisitedPages = () => (
    <div className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6">
      <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-6">Most Visited Pages</h3>
      <div className="space-y-3">
        {mostVisitedPages.map((page, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <span className="font-medium text-sudo-neutral-5">{page.page}</span>
            </div>
            <span className="text-sm text-sudo-neutral-3">{page.visits.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // Most visited sections
  const renderMostVisitedSections = () => (
    <div className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6">
      <h3 className="text-lg font-semibold text-sudo-neutral-5 mb-6">Most Time Spent Sections</h3>
      <div className="space-y-3">
        {mostVisitedSections.map((section, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <span className="font-medium text-sudo-neutral-5">{section.section}</span>
            </div>
            <span className="text-sm text-sudo-neutral-3">{section.avgTime}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <div className="p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sudo-neutral-5 mb-2">Dashboard</h1>
          <p className="text-sudo-neutral-3">Website analytics overview</p>
        </div>
        {/* CRUD Stats Cards */}
        {renderCrudStatsCards()}

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {renderVisitorsChart()}
          {renderMostVisitedPages()}
        </div>

        {/* Most Visited Sections */}
        {renderMostVisitedSections()}
      </div>
    </div>
  )
}
