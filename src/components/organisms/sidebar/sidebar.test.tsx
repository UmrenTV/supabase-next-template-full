import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from './sidebar'

const mockItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
]

describe('Sidebar', () => {
  it('renders with navigation items', () => {
    render(<Sidebar items={mockItems} />)
    
    mockItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders with icons when provided', () => {
    const itemsWithIcons = mockItems.map(item => ({
      ...item,
      icon: <span data-testid="icon">🔍</span>
    }))
    
    render(<Sidebar items={itemsWithIcons} />)
    const icons = screen.getAllByTestId('icon')
    expect(icons).toHaveLength(mockItems.length)
  })

  it('toggles sidebar visibility on mobile', () => {
    render(<Sidebar items={mockItems} />)
    
    const toggleButton = screen.getByRole('button', { name: /menu/i })
    const drawer = screen.getByRole('checkbox')
    
    expect(drawer).toBeChecked()
    fireEvent.click(toggleButton)
    expect(drawer).not.toBeChecked()
  })

  it('accepts additional className', () => {
    render(<Sidebar items={mockItems} className="custom-class" />)
    const container = screen.getByRole('navigation').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('renders with correct links', () => {
    render(<Sidebar items={mockItems} />)
    
    mockItems.forEach(item => {
      const link = screen.getByText(item.label).closest('a')
      expect(link).toHaveAttribute('href', item.href)
    })
  })
}) 