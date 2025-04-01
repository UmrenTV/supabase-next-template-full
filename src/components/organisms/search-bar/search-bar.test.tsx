import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchBar } from './search-bar'

describe('SearchBar', () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders with default props', () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Search products..." />)
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument()
  })

  it('handles search submission', async () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByPlaceholderText(/search/i)
    const searchButton = screen.getByRole('button', { name: /search/i })

    fireEvent.change(searchInput, { target: { value: 'test query' } })
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('trims whitespace from search query', async () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    
    const searchInput = screen.getByPlaceholderText(/search/i)
    const searchButton = screen.getByRole('button', { name: /search/i })

    fireEvent.change(searchInput, { target: { value: '  test query  ' } })
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    })
  })

  it('disables search when query is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />)
    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeDisabled()
  })

  it('disables search when loading', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading />)
    
    expect(screen.getByPlaceholderText(/search/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled()
  })

  it('accepts additional className', () => {
    render(<SearchBar onSearch={mockOnSearch} className="custom-class" />)
    const form = screen.getByRole('form')
    expect(form).toHaveClass('custom-class')
  })
}) 