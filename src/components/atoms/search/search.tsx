import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

interface SearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function Search({ onSearch, placeholder = 'Search...', className = '' }: SearchProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    onSearch(value)
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="input input-bordered w-full pr-20"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-12 text-base-content/70 hover:text-base-content"
        >
          <FaTimes />
        </button>
      )}
      <button
        onClick={handleSearch}
        className="absolute right-2 text-base-content/70 hover:text-base-content"
      >
        <FaSearch />
      </button>
    </div>
  )
} 