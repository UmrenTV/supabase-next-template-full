'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '@/lib/auth/auth-context'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  title: string
  navItems: NavItem[]
  isOpen?: boolean
  onToggle?: () => void
}

export function Sidebar({ title, navItems, isOpen = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <>
      <aside 
        className={`
          fixed top-0 left-0 h-screen bg-[#1B1E23] border-r border-gray-800
          transition-all duration-300 ease-in-out z-30
          ${isOpen ? 'w-64' : 'w-16'}
        `}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="h-16 flex items-center px-4 border-b border-gray-800">
          <div className="flex items-center justify-between w-full">
            <h1 
              className={`
                text-xl font-semibold transition-opacity duration-300
                ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
              `}
            >
              {title}
            </h1>
            <button 
              onClick={onToggle}
              className="p-2 bg-[#6C5DD3] rounded-full text-white hover:bg-[#5a4dbb] transition-colors min-w-[32px]"
            >
              {isOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.href} className="w-full">
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg transition-all duration-300 w-full
                    ${pathname === item.href 
                      ? 'bg-[#6C5DD3] text-white' 
                      : 'text-gray-400 hover:bg-gray-800'
                    }
                    ${!isOpen ? 'justify-center' : ''}
                  `}
                >
                  <span className="min-w-[24px] flex justify-center">{item.icon}</span>
                  <span 
                    className={`
                      ml-3 whitespace-nowrap transition-opacity duration-300
                      ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                    `}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
            
            {/* Auth Navigation */}
            <li className="w-full mt-auto">
              {user ? (
                <button
                  onClick={handleLogout}
                  className={`
                    flex items-center px-3 py-2 rounded-lg transition-all duration-300 w-full
                    text-gray-400 hover:bg-gray-800
                    ${!isOpen ? 'justify-center' : ''}
                  `}
                >
                  <span className="min-w-[24px] flex justify-center">
                    <FaSignOutAlt />
                  </span>
                  <span 
                    className={`
                      ml-3 whitespace-nowrap transition-opacity duration-300
                      ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                    `}
                  >
                    Logout
                  </span>
                </button>
              ) : (
                <Link
                  href={`/auth/login?redirectTo=${encodeURIComponent(pathname)}`}
                  className={`
                    flex items-center px-3 py-2 rounded-lg transition-all duration-300 w-full
                    text-gray-400 hover:bg-gray-800
                    ${!isOpen ? 'justify-center' : ''}
                  `}
                >
                  <span className="min-w-[24px] flex justify-center">
                    <FaSignInAlt />
                  </span>
                  <span 
                    className={`
                      ml-3 whitespace-nowrap transition-opacity duration-300
                      ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                    `}
                  >
                    Login
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={onToggle}
        />
      )}
    </>
  )
} 