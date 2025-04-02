'use client'

import { FaBell, FaBars } from 'react-icons/fa'
import { Search } from '@/components/atoms'

interface HeaderProps {
  user: {
    name: string
    email: string
    initials: string
  }
  showSearch?: boolean
  showNotifications?: boolean
  onMenuClick?: () => void
}

export function Header({ user, showSearch = false, showNotifications = false, onMenuClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden btn btn-ghost btn-sm"
          onClick={onMenuClick}
        >
          <FaBars className="text-xl" />
        </button>
        {showSearch && (
          <div className="w-64">
            <Search 
              onSearch={(query: string) => console.log('Search:', query)}
              placeholder="Search..."
            />
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {showNotifications && (
          <button className="btn btn-ghost btn-circle">
            <FaBell className="text-xl" />
          </button>
        )}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              {user.initials}
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
} 