'use client'


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
  { section: 'Testimonials', avgTime: '1m 55s' },
  { section: 'Contact Form', avgTime: '2m 18s' },
  { section: 'Blog Posts', avgTime: '5m 45s' }
]

export default function AdminDashboard() {
  // ============================================================================
  // CALCULATIONS
  // ============================================================================
  const totalVisitors = visitorData.reduce((sum, item) => sum + item.visitors, 0)
  const totalContacts = 1247
  const maxVisitors = Math.max(...visitorData.map(item => item.visitors))

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  // Stats cards
  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sudo-neutral-3 text-sm">Total Visitors</p>
            <p className="text-3xl font-bold text-sudo-neutral-5 mt-1">
              {totalVisitors.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-sudo-white-2 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sudo-neutral-3 text-sm">Total Contacts</p>
            <p className="text-3xl font-bold text-sudo-neutral-5 mt-1">
              {totalContacts.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sudo-neutral-5 mb-2">Dashboard</h1>
          <p className="text-sudo-neutral-3">Website analytics overview</p>
        </div>

        {/* Stats Cards */}
        {renderStatsCards()}

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
