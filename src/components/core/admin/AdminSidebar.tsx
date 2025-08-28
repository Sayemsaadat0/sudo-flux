'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface SidebarItem {
  name: string
  href: string
  icon: React.ReactNode
  children?: { name: string; href: string }[]
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
      </svg>
    )
  },
  {
    name: 'Blog Management',
    href: '/admin/blogs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    children: [
      { name: 'All Posts', href: '/admin/blogs' },
      { name: 'Create Post', href: '/admin/blogs/create' },
      { name: 'Categories', href: '/admin/blogs/categories' }
    ]
  },
  {
    name: 'Portfolio',
    href: '/admin/portfolio',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    children: [
      { name: 'All Projects', href: '/admin/portfolio' },
      { name: 'Add Project', href: '/admin/portfolio/create' },
      { name: 'Skills', href: '/admin/portfolio/skills' }
    ]
  },
  {
    name: 'Services',
    href: '/admin/services',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    children: [
      { name: 'All Services', href: '/admin/services' },
      { name: 'Add Service', href: '/admin/services/create' },
      { name: 'Service Categories', href: '/admin/services/categories' }
    ]
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    children: [
      { name: 'All Testimonials', href: '/admin/testimonials' },
      { name: 'Add Testimonial', href: '/admin/testimonials/create' }
    ]
  },
  {
    name: 'Team',
    href: '/admin/team',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    children: [
      { name: 'All Members', href: '/admin/team' },
      { name: 'Add Member', href: '/admin/team/create' }
    ]
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    children: [
      { name: 'Overview', href: '/admin/analytics' },
      { name: 'Traffic', href: '/admin/analytics/traffic' },
      { name: 'Engagement', href: '/admin/analytics/engagement' }
    ]
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    children: [
      { name: 'General', href: '/admin/settings' },
      { name: 'Profile', href: '/admin/settings/profile' },
      { name: 'Security', href: '/admin/settings/security' },
      { name: 'Appearance', href: '/admin/settings/appearance' }
    ]
  }
]

// Common icon for nested routes
const nestedIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function AdminSidebar({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (collapsed: boolean) => void }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className={cn(
      "fixed top-20 left-0 z-40 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out",
      "bg-gradient-to-b from-white to-sudo-white-1",
      "border-r border-sudo-white-3  flex flex-col",
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 py-4 border-b border-sudo-white-2">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-gradient-to-b from-sudo-purple-6 to-sudo-blue-6 rounded-full"></div>
              <h2 className="text-sudo-paragraph-20 font-bold text-sudo-neutral-5">
                Admin Panel
              </h2>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              "text-sudo-neutral-4 hover:text-sudo-purple-6",
              "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
              "focus:outline-none focus:ring-2 focus:ring-sudo-purple-3 focus:ring-offset-2"
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Items - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={item.name} className="border-none">
                    <AccordionTrigger 
                      className={cn(
                        "flex items-center w-full p-3 rounded-xl transition-all duration-200",
                        "",
                        "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                        "hover:text-sudo-purple-7 focus:outline-none",
                        "group data-[state=open]:bg-gradient-to-r data-[state=open]:from-sudo-purple-2 data-[state=open]:to-sudo-blue-2",
                        "data-[state=open]:text-sudo-purple-8",
                        isActive(item.href) && "bg-gradient-to-r from-sudo-purple-2 to-sudo-blue-2 text-sudo-purple-8",
                        isCollapsed ? 'justify-center' : 'justify-between'
                      )}
                    >
                      <div className="flex items-center">
                        <span className={cn(
                          "flex-shrink-0 transition-colors duration-200",
                          "group-hover:text-sudo-purple-6"
                        )}>
                          {item.icon}
                        </span>
                        {!isCollapsed && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-0">
                      {!isCollapsed && (
                        <div className="space-y-1 ml-9">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "flex items-center p-2 rounded-lg transition-all duration-200",
                                "text-sudo-regular-16 font-normal",
                                "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                                "hover:text-sudo-purple-7 focus:outline-none",
                                isActive(child.href) && "bg-gradient-to-r from-sudo-purple-1 to-sudo-blue-1 text-sudo-purple-7"
                              )}
                            >
                              <span className="flex-shrink-0 w-4 h-4 mr-3 text-sudo-neutral-3">
                                {nestedIcon}
                              </span>
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center w-full p-3 rounded-xl transition-all duration-200",
                    "text-sudo-paragraph-20 font-medium",
                    "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                    "hover:text-sudo-purple-7 focus:outline-none",
                    isActive(item.href) && "bg-gradient-to-r from-sudo-purple-2 to-sudo-blue-2 text-sudo-purple-8",
                    isCollapsed && "justify-center"
                  )}
                >
                  <span className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    "group-hover:text-sudo-purple-6"
                  )}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer - Fixed */}
      {!isCollapsed && (
        <div className="flex-shrink-0 px-4 py-6 border-t border-sudo-white-2">
          <div className="p-4 rounded-xl bg-gradient-to-r from-sudo-purple-1 to-sudo-blue-1">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sudo-regular-16 font-medium text-sudo-neutral-5">Need Help?</p>
                <p className="text-xs text-sudo-neutral-3">Contact support</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
