import { render, screen, fireEvent } from '@testing-library/react'
import AdminDashboard from './page'

describe('AdminDashboard', () => {
  it('renders dashboard title', () => {
    render(<AdminDashboard />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders all stat cards', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument()
  })

  it('renders stat values and changes', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('2,543')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
    expect(screen.getByText('$45,678')).toBeInTheDocument()
    expect(screen.getByText('-3.1%')).toBeInTheDocument()
  })

  it('renders chart sections', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
    expect(screen.getByText('User Activity')).toBeInTheDocument()
  })

  it('renders time range selectors', () => {
    render(<AdminDashboard />)
    
    const selectors = screen.getAllByRole('combobox')
    expect(selectors).toHaveLength(2)
    expect(selectors[0]).toHaveValue('week')
  })

  it('changes time range when selector is changed', () => {
    render(<AdminDashboard />)
    
    const selectors = screen.getAllByRole('combobox')
    fireEvent.change(selectors[0], { target: { value: 'month' } })
    expect(selectors[0]).toHaveValue('month')
  })

  it('renders recent activity section', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('created a new order')).toBeInTheDocument()
  })

  it('renders view buttons in recent activity', () => {
    render(<AdminDashboard />)
    
    const viewButtons = screen.getAllByRole('button', { name: /view/i })
    expect(viewButtons).toHaveLength(5)
  })

  it('renders activity timestamps', () => {
    render(<AdminDashboard />)
    
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument()
  })

  it('renders activity icons', () => {
    render(<AdminDashboard />)
    
    const activityIcons = screen.getAllByTestId('activity-icon')
    expect(activityIcons).toHaveLength(5)
  })
}) 