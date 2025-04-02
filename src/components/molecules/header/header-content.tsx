'use client'

import { FaBell, FaSearch } from 'react-icons/fa'

interface User {
  name: string
  email?: string
  initials: string
  avatar?: string
}

interface HeaderContentProps {
  user: User
  showSearch?: boolean
  showNotifications?: boolean
}

export function HeaderContent({ user, showSearch = true, showNotifications = true }: HeaderContentProps) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Search Bar */}
      {showSearch && (
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#272B30] border border-gray-700 text-gray-300 focus:outline-none focus:border-[#6C5DD3]"
            />
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        {showNotifications && (
          <button className="relative text-gray-400 hover:text-white transition-colors">
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
        
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#6C5DD3] flex items-center justify-center text-sm">
            {user.initials}
          </div>
          {user.email && (
            <div className="hidden md:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          )}
          {!user.email && (
            <span className="text-sm font-medium">{user.name}</span>
          )}
        </div>
      </div>
    </div>
  )
} 