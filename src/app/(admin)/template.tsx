'use client'
import { AdminSidebar } from "@/components/core/admin/AdminSidebar"
import { AdminNavbar } from "@/components/core/admin/AdminNavbar"
import { useState } from "react"

const Template = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-white">
      {/* Navbar */}
      <AdminNavbar />
      
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <main className="pt-24 p-4">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}
    </div>
    )
}
export default Template