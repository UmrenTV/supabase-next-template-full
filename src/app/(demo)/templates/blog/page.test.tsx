import { render, screen, fireEvent, within } from '@testing-library/react'
import BlogPage from './page'

const defaultSearchParams = {
  searchParams: {}
}

describe('BlogPage', () => {
  it('renders the blog page with all sections', () => {
    render(<BlogPage {...defaultSearchParams} />)

    // Check hero section
    expect(screen.getByText('Our Blog')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument()

    // Check initial posts (first page)
    expect(screen.getAllByRole('article')).toHaveLength(6) // POSTS_PER_PAGE

    // Check categories
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()

    // Check newsletter section
    expect(screen.getByText('Subscribe to Newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('handles search functionality correctly', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    const searchInput = screen.getByPlaceholderText('Search articles...')
    
    // Search for TypeScript
    fireEvent.change(searchInput, { target: { value: 'TypeScript' } })
    
    // Should show only TypeScript-related post
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(1)
    expect(articles[0]).toHaveTextContent('TypeScript Best Practices')
  })

  it('filters posts by category', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Click on Development category
    const developmentButton = screen.getByRole('button', { name: 'Development' })
    fireEvent.click(developmentButton)
    
    // Should show only Development posts
    const articles = screen.getAllByRole('article')
    articles.forEach(article => {
      expect(within(article).getByText('Development')).toBeInTheDocument()
    })
  })

  it('handles pagination correctly', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Check initial page
    expect(screen.getAllByRole('article')).toHaveLength(6)
    
    // Navigate to next page
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    // Check if page number is updated
    const pageButtons = screen.getAllByRole('button').filter(button => 
      !isNaN(Number(button.textContent))
    )
    expect(pageButtons[1]).toHaveClass('btn-primary') // Second page should be active
  })

  it('resets pagination when changing filters', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Go to second page
    const nextButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextButton)
    
    // Apply search filter
    const searchInput = screen.getByPlaceholderText('Search articles...')
    fireEvent.change(searchInput, { target: { value: 'Next.js' } })
    
    // Should reset to first page
    const pageButtons = screen.getAllByRole('button').filter(button => 
      !isNaN(Number(button.textContent))
    )
    expect(pageButtons[0]).toHaveClass('btn-primary') // First page should be active
  })

  it('shows no results message when search has no matches', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    const searchInput = screen.getByPlaceholderText('Search articles...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent article' } })
    
    expect(screen.getByText('No posts found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search or category filters')).toBeInTheDocument()
  })

  it('handles combined category and search filters', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Select Development category
    const developmentButton = screen.getByRole('button', { name: 'Development' })
    fireEvent.click(developmentButton)
    
    // Search for "Next.js"
    const searchInput = screen.getByPlaceholderText('Search articles...')
    fireEvent.change(searchInput, { target: { value: 'Next.js' } })
    
    // Should show only Next.js post in Development category
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(1)
    expect(articles[0]).toHaveTextContent('Getting Started with Next.js 14')
    expect(articles[0]).toHaveTextContent('Development')
  })

  it('sorts posts by latest', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Test sorting by latest
    const sortSelect = screen.getByLabelText('Sort by')
    fireEvent.change(sortSelect, { target: { value: 'latest' } })
    let articles = screen.getAllByRole('article')
    let dates = articles.map(article => {
      const dateText = within(article).getByText(/\d{4}-\d{2}-\d{2}/).textContent || ''
      return new Date(dateText).getTime()
    })
    expect([...dates]).toEqual(dates.sort((a, b) => b - a))
  })

  it('filters posts by tag', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Click on React tag
    const reactTag = screen.getAllByText('React')[0] // Get first React tag
    fireEvent.click(reactTag)
    
    // Should show only posts with React tag
    const articles = screen.getAllByRole('article')
    articles.forEach(article => {
      const tags = within(article).getAllByRole('button')
      expect(tags.some(tag => tag.textContent === 'React')).toBe(true)
    })
  })

  it('sorts posts by different criteria', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    const sortSelect = screen.getByRole('combobox')
    
    // Test sorting by title
    fireEvent.change(sortSelect, { target: { value: 'title' } })
    let articles = screen.getAllByRole('article')
    let titles = articles.map(article => within(article).getByRole('link').textContent)
    expect([...titles]).toEqual(titles.sort())
    
    // Test sorting by latest
    fireEvent.change(sortSelect, { target: { value: 'latest' } })
    articles = screen.getAllByRole('article')
    let dates = articles.map(article => {
      const dateText = within(article).getByText(/\d{4}-\d{2}-\d{2}/).textContent || ''
      return new Date(dateText).getTime()
    })
    expect([...dates]).toEqual(dates.sort((a, b) => b - a))
  })

  it('combines tag and category filters', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Select Development category
    const developmentButton = screen.getByRole('button', { name: 'Development' })
    fireEvent.click(developmentButton)
    
    // Select React tag
    const reactTag = screen.getAllByText('React')[0]
    fireEvent.click(reactTag)
    
    // Should show only React posts in Development category
    const articles = screen.getAllByRole('article')
    articles.forEach(article => {
      expect(within(article).getByText('Development')).toBeInTheDocument()
      const tags = within(article).getAllByRole('button')
      expect(tags.some(tag => tag.textContent === 'React')).toBe(true)
    })
  })

  it('allows removing selected tag', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Select React tag
    const reactTag = screen.getAllByText('React')[0]
    fireEvent.click(reactTag)
    
    // Click remove button on tag badge
    const removeButton = screen.getByRole('button', { name: '×' })
    fireEvent.click(removeButton)
    
    // Should show all posts again
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('maintains sort order when changing filters', () => {
    render(<BlogPage {...defaultSearchParams} />)
    
    // Set sort to title
    const sortSelect = screen.getByRole('combobox')
    fireEvent.change(sortSelect, { target: { value: 'title' } })
    
    // Apply tag filter
    const reactTag = screen.getAllByText('React')[0]
    fireEvent.click(reactTag)
    
    // Check if posts are still sorted by title
    const articles = screen.getAllByRole('article')
    const titles = articles.map(article => within(article).getByRole('link').textContent)
    expect([...titles]).toEqual(titles.sort())
  })
}) 