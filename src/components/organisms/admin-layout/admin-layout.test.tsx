import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AdminLayout } from './admin-layout'
import { usePathname } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('AdminLayout', () => {
  const mockChildren = <div>Test Content</div>
  const mockTitle = 'Test Page'

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    // Default pathname mock
    ;(usePathname as jest.Mock).mockReturnValue('/templates/admin')
  })

  it('renders with title and children', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    expect(screen.getByText(mockTitle)).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights active navigation item', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/templates/admin/users')
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    const usersLink = screen.getByText('Users').closest('a')
    expect(usersLink).toHaveClass('bg-primary')
  })

  it('toggles sidebar on mobile', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    const toggleButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(toggleButton)
    
    const sidebar = screen.getByRole('navigation').parentElement
    expect(sidebar).toHaveClass('-translate-x-full')
  })

  it('toggles user menu', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    const userButton = screen.getByRole('button', { name: /john doe/i })
    fireEvent.click(userButton)
    
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    const searchInput = screen.getByPlaceholderText(/search/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('renders notification bell with indicator', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i })
    expect(notificationButton).toBeInTheDocument()
    expect(screen.getByTestId('notification-indicator')).toBeInTheDocument()
  })

  it('renders default avatar with user name', () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('closes user menu when clicking outside', async () => {
    render(<AdminLayout title={mockTitle}>{mockChildren}</AdminLayout>)
    
    // Open user menu
    const userButton = screen.getByRole('button', { name: /john doe/i })
    fireEvent.click(userButton)
    
    // Click outside
    fireEvent.click(document.body)
    
    await waitFor(() => {
      expect(screen.queryByText('Profile')).not.toBeInTheDocument()
    })
  })
}) 