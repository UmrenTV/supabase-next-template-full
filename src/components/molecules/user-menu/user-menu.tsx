'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { DefaultAvatar } from '@/components/atoms/default-avatar/default-avatar'

interface UserMenuProps {
  userName?: string
  avatarUrl?: string
  onLogout?: () => void
}

export function UserMenu({ userName = 'John Doe', avatarUrl, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <DefaultAvatar name={userName} size="sm" url={avatarUrl} />
        <span className="hidden md:block">{userName}</span>
        <FaUserCircle className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg py-1">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-base-content hover:bg-base-200"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-base-200"
            onClick={() => {
              onLogout?.()
              setIsOpen(false)
            }}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
} 