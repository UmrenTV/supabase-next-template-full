import { render, screen, fireEvent } from '@testing-library/react'
import { DashboardLayout } from './dashboard-layout'

describe('DashboardLayout', () => {
  it('renders with title and children', () => {
    render(
      <DashboardLayout title="Test Dashboard">
        <div>Test Content</div>
      </DashboardLayout>
    )
    expect(screen.getByText('Test Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('toggles sidebar when menu button is clicked', () => {
    render(
      <DashboardLayout title="Test Dashboard">
        <div>Test Content</div>
      </DashboardLayout>
    )
    
    const menuButton = screen.getByRole('button')
    const sidebar = screen.getByRole('navigation')
    
    // Sidebar should be visible by default
    expect(sidebar).toHaveClass('translate-x-0')
    
    // Click menu button to hide sidebar
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('-translate-x-full')
    
    // Click menu button again to show sidebar
    fireEvent.click(menuButton)
    expect(sidebar).toHaveClass('translate-x-0')
  })

  it('renders user avatar and dropdown', () => {
    render(
      <DashboardLayout title="Test Dashboard">
        <div>Test Content</div>
      </DashboardLayout>
    )
    
    const avatar = screen.getByRole('button', { name: /user avatar/i })
    expect(avatar).toBeInTheDocument()
    
    // Click avatar to show dropdown
    fireEvent.click(avatar)
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
}) 