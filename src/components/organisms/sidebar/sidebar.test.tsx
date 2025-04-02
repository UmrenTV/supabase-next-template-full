import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from './sidebar'

const mockItems = [
  { label: 'Home', href: '/', icon: <span data-testid="icon">🏠</span> },
  { label: 'About', href: '/about', icon: <span data-testid="icon">ℹ️</span> },
  { label: 'Contact', href: '/contact', icon: <span data-testid="icon">📧</span> }
]

describe('Sidebar', () => {
  it('renders with navigation items', () => {
    render(<Sidebar title="Test" navItems={mockItems} />)
    
    mockItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders with icons when provided', () => {
    const itemsWithIcons = mockItems.map(item => ({
      ...item,
      icon: <span data-testid="icon">🔍</span>
    }))
    
    render(<Sidebar title="Test" navItems={itemsWithIcons} />)
    const icons = screen.getAllByTestId('icon')
    expect(icons).toHaveLength(mockItems.length)
  })

  it('toggles sidebar visibility on mobile', () => {
    render(<Sidebar title="Test" navItems={mockItems} />)
    
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
  })

  it('renders with correct links', () => {
    render(<Sidebar title="Test" navItems={mockItems} />)
    
    mockItems.forEach(item => {
      const link = screen.getByText(item.label).closest('a')
      expect(link).toHaveAttribute('href', item.href)
    })
  })
}) 