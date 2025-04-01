'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaBars, 
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaBell,
  FaSearch
} from 'react-icons/fa'
import { DefaultAvatar } from '@/components/atoms/default-avatar/default-avatar'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

const navigation = [
  { name: 'Dashboard', href: '/templates/admin', icon: FaHome },
  { name: 'Users', href: '/templates/admin/users', icon: FaUsers },
  { name: 'Analytics', href: '/templates/admin/analytics', icon: FaChartBar },
  { name: 'Settings', href: '/templates/admin/settings', icon: FaCog },
]

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-base-200">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/templates/admin" className="text-xl font-bold">
              Admin Panel
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-primary text-primary-content'
                      : 'text-base-content hover:bg-base-200'
                  }`}
                >
                  <item.icon className="mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-200 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-base-100 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <FaBars />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-base-content hover:bg-base-200 rounded-lg">
              <FaBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <DefaultAvatar name="John Doe" size="sm" />
                <span className="hidden md:block">John Doe</span>
                <FaUserCircle className="text-xl" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg py-1">
                  <Link
                    href="/templates/admin/profile"
                    className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/templates/admin/settings"
                    className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
                  >
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-base-200"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  )
} 