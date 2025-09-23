'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'

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
    name: 'Industry',
    href: '/admin/industry',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    name: 'Contacts',
    href: '/admin/contacts',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: 'FAQ',
    href: '/admin/faq',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    name: 'Blogs',
    href: '/admin/blogs',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )
  },
  {
    name: 'Teams',
    href: '/admin/teams',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    name: 'Careers',
    href: '/admin/careers',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
      </svg>
    )
  },
  {
    name: 'Applications',
    href: '/admin/applicants',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
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
      { name: 'Categories', href: '/admin/categories' }
    ]
  },
  {
    name: 'Consultations',
    href: '/admin/consultations',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  },
  {
    name: 'Visitors',
    href: '/admin/visitors',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
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
      { name: 'Appearance', href: '/admin/settings/appearance' },
      { name: 'Legal Content', href: '/admin/settings/privacy-content' }
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
                        "flex items-center   w-full p-3 rounded-xl transition-all duration-200",
                        "",
                        "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                        "hover:text-sudo-purple-7 focus:outline-none",
                        "group data-[state=open]:bg-gradient-to-r data-[state=open]:from-sudo-purple-2 data-[state=open]:to-sudo-blue-2",
                        "data-[state=open]:text-sudo-purple-8",
                        isActive(item.href) && "bg-gradient-to-r from-sudo-purple-2 to-sudo-blue-2 text-sudo-purple-8",
                        isCollapsed ? 'justify-center' : 'justify-between'
                      )}
                    >
                      <div className="flex items-center w-full">
                        <span className={cn(
                          "flex-shrink-0 transition-colors duration-200",
                          "group-hover:text-sudo-purple-6"
                        )}>
                          {item.icon}
                        </span>
                        {!isCollapsed && (
                          <span className="ml-3 flex items-center justify-between  w-full">{item.name} <ChevronDownIcon className="size-4" /></span>
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
                    " font-medium",
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

    </aside>
  )
}
