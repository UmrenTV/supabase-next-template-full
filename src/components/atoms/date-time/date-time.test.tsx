import { render, screen, fireEvent } from '@testing-library/react'
import { DateTime } from './date-time'

describe('DateTime', () => {
  it('renders with default props', () => {
    render(<DateTime value="" onChange={() => {}} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('input', 'input-bordered')
    expect(input).toHaveAttribute('type', 'datetime-local')
  })

  it('renders with label', () => {
    render(<DateTime label="Select Date" value="" onChange={() => {}} />)
    const label = screen.getByText('Select Date')
    expect(label).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<DateTime value="" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '2024-03-20T10:00' } })
    expect(handleChange).toHaveBeenCalledWith('2024-03-20T10:00')
  })

  it('renders with error message', () => {
    render(<DateTime value="" onChange={() => {}} error="Invalid date" />)
    const errorMessage = screen.getByText('Invalid date')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables input when disabled prop is true', () => {
    render(<DateTime value="" onChange={() => {}} disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('makes input read-only when readOnly prop is true', () => {
    render(<DateTime value="2024-03-20T10:00" onChange={() => {}} readOnly />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('readonly')
  })

  it('renders with different input types', () => {
    const types = ['date', 'time', 'datetime-local']
    
    types.forEach(type => {
      const { rerender } = render(<DateTime type={type as any} value="" onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', type)
      rerender(<></>)
    })
  })

  it('accepts min and max attributes', () => {
    render(
      <DateTime 
        value="" 
        onChange={() => {}} 
        min="2024-01-01T00:00"
        max="2024-12-31T23:59"
      />
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('min', '2024-01-01T00:00')
    expect(input).toHaveAttribute('max', '2024-12-31T23:59')
  })

  it('accepts additional className', () => {
    render(<DateTime value="" onChange={() => {}} className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })
}) 