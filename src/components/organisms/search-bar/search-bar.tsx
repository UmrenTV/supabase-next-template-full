import { useState } from 'react'
import { Button, TextInput } from '@/components/atoms'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/molecules/input-group/input-group'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  isLoading?: boolean
  className?: string
}

export function SearchBar({
  onSearch,
  placeholder = 'Search...',
  isLoading = false,
  className = ''
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <InputGroup>
        <InputGroupInput>
          <TextInput
            type="search"
            value={query}
            onChange={setQuery}
            placeholder={placeholder}
            disabled={isLoading}
          />
        </InputGroupInput>
        <InputGroupAddon>
          <Button
            type="submit"
            label={isLoading ? 'Searching...' : 'Search'}
            variant="primary"
            loading={isLoading}
            disabled={isLoading || !query.trim()}
          />
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
} 