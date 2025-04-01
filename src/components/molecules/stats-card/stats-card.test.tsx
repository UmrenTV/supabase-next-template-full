import { render, screen } from '@testing-library/react'
import { StatsCard } from './stats-card'

describe('StatsCard', () => {
  it('renders with basic props', () => {
    render(<StatsCard title="Test Title" value="123" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('renders with change and trend', () => {
    render(<StatsCard title="Test" value="123" change="10%" trend="up" />)
    expect(screen.getByText('↑')).toBeInTheDocument()
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const icon = <div data-testid="test-icon">Icon</div>
    render(<StatsCard title="Test" value="123" icon={icon} />)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<StatsCard title="Test" value="123" className="custom-class" />)
    expect(screen.getByText('Test').closest('.card')).toHaveClass('custom-class')
  })
}) 