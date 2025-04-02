'use client'

import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function SearchBar({ placeholder = 'Search...', onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
    </div>
  )
} 