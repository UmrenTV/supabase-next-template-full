import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox checked={false} onChange={() => {}} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveClass('checkbox')
  })

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" checked={false} onChange={() => {}} />)
    const label = screen.getByText('Accept terms')
    expect(label).toBeInTheDocument()
  })

  it('handles checked state changes', () => {
    const handleChange = jest.fn()
    render(<Checkbox checked={false} onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('renders with error message', () => {
    render(<Checkbox checked={false} onChange={() => {}} error="Please accept terms" />)
    const errorMessage = screen.getByText('Please accept terms')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables checkbox when disabled prop is true', () => {
    render(<Checkbox checked={false} onChange={() => {}} disabled />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('accepts additional className', () => {
    render(<Checkbox checked={false} onChange={() => {}} className="custom-class" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('custom-class')
  })

  it('renders with checked state', () => {
    render(<Checkbox checked={true} onChange={() => {}} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('has cursor-pointer class on label', () => {
    render(<Checkbox label="Click me" checked={false} onChange={() => {}} />)
    const label = screen.getByText('Click me').closest('label')
    expect(label).toHaveClass('cursor-pointer')
  })
}) 