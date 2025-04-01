import { render, screen, fireEvent } from '@testing-library/react'
import AnalyticsPage from './page'

describe('AnalyticsPage', () => {
  it('renders analytics page title', () => {
    render(<AnalyticsPage />)
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('renders all stat cards', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('Total Visitors')).toBeInTheDocument()
    expect(screen.getByText('Page Views')).toBeInTheDocument()
    expect(screen.getByText('Bounce Rate')).toBeInTheDocument()
    expect(screen.getByText('Avg. Session Duration')).toBeInTheDocument()
  })

  it('renders stat values and changes', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('45,678')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
    expect(screen.getByText('32.1%')).toBeInTheDocument()
    expect(screen.getByText('-3.1%')).toBeInTheDocument()
  })

  it('renders traffic overview section', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('Traffic Overview')).toBeInTheDocument()
  })

  it('renders time range selector', () => {
    render(<AnalyticsPage />)
    
    const selector = screen.getByRole('combobox')
    expect(selector).toBeInTheDocument()
    expect(selector).toHaveValue('week')
  })

  it('changes time range when selector is changed', () => {
    render(<AnalyticsPage />)
    
    const selector = screen.getByRole('combobox')
    fireEvent.change(selector, { target: { value: 'month' } })
    expect(selector).toHaveValue('month')
  })

  it('renders device usage section', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('Device Usage')).toBeInTheDocument()
    expect(screen.getByText('Desktop')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
    expect(screen.getByText('Tablet')).toBeInTheDocument()
  })

  it('renders device usage percentages', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('25%')).toBeInTheDocument()
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('renders location distribution section', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('Location Distribution')).toBeInTheDocument()
    expect(screen.getByText('United States')).toBeInTheDocument()
    expect(screen.getByText('United Kingdom')).toBeInTheDocument()
    expect(screen.getByText('Canada')).toBeInTheDocument()
    expect(screen.getByText('Australia')).toBeInTheDocument()
    expect(screen.getByText('Others')).toBeInTheDocument()
  })

  it('renders location distribution percentages', () => {
    render(<AnalyticsPage />)
    
    expect(screen.getByText('45%')).toBeInTheDocument()
    expect(screen.getByText('20%')).toBeInTheDocument()
    expect(screen.getByText('15%')).toBeInTheDocument()
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('renders progress bars for device usage', () => {
    render(<AnalyticsPage />)
    
    const progressBars = screen.getAllByRole('progressbar')
    expect(progressBars).toHaveLength(8) // 4 for device usage, 4 for location distribution
  })

  it('renders device icons', () => {
    render(<AnalyticsPage />)
    
    const deviceIcons = screen.getAllByTestId('device-icon')
    expect(deviceIcons).toHaveLength(3)
  })

  it('renders location icons', () => {
    render(<AnalyticsPage />)
    
    const locationIcons = screen.getAllByTestId('location-icon')
    expect(locationIcons).toHaveLength(5)
  })
}) 