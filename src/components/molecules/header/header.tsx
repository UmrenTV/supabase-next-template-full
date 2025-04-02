'use client'

import { useState } from 'react'
import { FaBars, FaBell, FaSearch } from 'react-icons/fa'
import { DefaultAvatar } from '@/components/atoms/default-avatar/default-avatar'
import { SearchBar } from '@/components/molecules/search-bar/search-bar'
import { UserMenu } from '@/components/molecules/user-menu/user-menu'

interface HeaderProps {
  title: string
  onMenuClick: () => void
  showMenuButton?: boolean
}

export function Header({ title, onMenuClick, showMenuButton = true }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <FaBars />
          </button>
        )}

        <div className="flex-1 px-2 mx-2">{title}</div>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4">
          <SearchBar />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-base-content hover:bg-base-200 rounded-lg">
          <FaBell />
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  )
} 