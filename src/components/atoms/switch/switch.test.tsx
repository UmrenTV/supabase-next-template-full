import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from './switch'

describe('Switch', () => {
  it('renders with default props', () => {
    render(<Switch checked={false} onChange={() => {}} />)
    const switchInput = screen.getByRole('switch')
    expect(switchInput).toBeInTheDocument()
    expect(switchInput).toHaveClass('toggle')
  })

  it('renders with label', () => {
    render(<Switch label="Enable Feature" checked={false} onChange={() => {}} />)
    const label = screen.getByText('Enable Feature')
    expect(label).toBeInTheDocument()
  })

  it('handles checked state changes', () => {
    const handleChange = jest.fn()
    render(<Switch checked={false} onChange={handleChange} />)
    
    const switchInput = screen.getByRole('switch')
    fireEvent.click(switchInput)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('renders with error message', () => {
    render(<Switch checked={false} onChange={() => {}} error="Required field" />)
    const errorMessage = screen.getByText('Required field')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables switch when disabled prop is true', () => {
    render(<Switch checked={false} onChange={() => {}} disabled />)
    const switchInput = screen.getByRole('switch')
    expect(switchInput).toBeDisabled()
  })

  it('accepts additional className', () => {
    render(<Switch checked={false} onChange={() => {}} className="custom-class" />)
    const switchInput = screen.getByRole('switch')
    expect(switchInput).toHaveClass('custom-class')
  })

  it('maintains checked state', () => {
    render(<Switch checked={true} onChange={() => {}} />)
    const switchInput = screen.getByRole('switch')
    expect(switchInput).toBeChecked()
  })
}) 