'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

export function AdminNavbar() {

  return (
    <nav className={cn(
      "fixed left-0 right-0 top-0 z-50",
      "bg-white/95 backdrop-blur-md border-b border-sudo-white-3",
      ""
    )}>
      <div className="px-5">
        <div className="flex items-center justify-between h-20">
          {/* Left Section - Logo and Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sudo-purple-6 to-sudo-blue-6 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sudo-header-22 font-bold gradient-text-static">
                  Sudo Flux
                </span>
                <span className="text-xs text-sudo-neutral-3 font-medium">
                  Admin Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section - Actions and User Menu */}
          <div className="">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-xl",
                    "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                    "transition-all duration-200 focus:outline-none",
                    "focus:ring-2 focus:ring-sudo-purple-3 focus:ring-offset-2"
                  )}
                >
                  <div className="relative">
                    <Image 
                      className="w-8 h-8 rounded-lg object-cover" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                      alt="Admin user"
                      width={32}
                      height={32}
                    />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3",
                      "bg-gradient-to-r from-green-400 to-green-600",
                      "rounded-full border-2 border-white"
                    )}></div>
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sudo-regular-16 font-medium text-sudo-neutral-5">
                      John Doe
                    </span>
                    <span className="text-xs text-sudo-neutral-3">
                      Administrator
                    </span>
                  </div>
                  <svg className="hidden md:block w-4 h-4 text-sudo-neutral-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={cn(
                "w-64 p-2 mt-2",
                "bg-white border border-sudo-white-3",
                "rounded-xl shadow-lg"
              )}>
                <DropdownMenuLabel className={cn(
                  "p-3 rounded-lg",
                  "bg-gradient-to-r from-sudo-purple-1 to-sudo-blue-1"
                )}>
                  <div className="flex items-center space-x-3">
                    <Image 
                      className="w-10 h-10 rounded-lg object-cover" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                      alt="Admin user"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <p className="text-sudo-regular-16 font-medium text-sudo-neutral-5">
                        John Doe
                      </p>
                      <p className="text-xs text-sudo-neutral-3">
                        john.doe@sudoflux.com
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild className={cn(
                  "p-3 rounded-lg cursor-pointer",
                  "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                  "transition-all duration-200"
                )}>
                  <Link href="/admin/profile" className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-sudo-neutral-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sudo-regular-16 text-sudo-neutral-5">Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={cn(
                  "p-3 rounded-lg cursor-pointer",
                  "hover:bg-gradient-to-r hover:from-sudo-purple-1 hover:to-sudo-blue-1",
                  "transition-all duration-200"
                )}>
                  <Link href="/admin/settings" className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-sudo-neutral-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sudo-regular-16 text-sudo-neutral-5">Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild className={cn(
                  "p-3 rounded-lg cursor-pointer",
                  "hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100",
                  "transition-all duration-200"
                )}>
                  <Link href="/auth/login" className="flex items-center space-x-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sudo-regular-16 text-red-600 font-medium">Sign out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
