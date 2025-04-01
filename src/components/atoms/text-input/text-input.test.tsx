import { render, screen, fireEvent } from '@testing-library/react'
import { TextInput } from './text-input'

describe('TextInput', () => {
  it('renders with default props', () => {
    render(<TextInput value="" onChange={() => {}} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('input', 'input-bordered')
  })

  it('renders with label', () => {
    render(<TextInput label="Email" value="" onChange={() => {}} />)
    const label = screen.getByText('Email')
    expect(label).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<TextInput placeholder="Enter email" value="" onChange={() => {}} />)
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<TextInput value="" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(handleChange).toHaveBeenCalledWith('test@example.com')
  })

  it('renders with error message', () => {
    render(<TextInput value="" onChange={() => {}} error="Invalid email" />)
    const errorMessage = screen.getByText('Invalid email')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables input when disabled prop is true', () => {
    render(<TextInput value="" onChange={() => {}} disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('makes input read-only when readOnly prop is true', () => {
    render(<TextInput value="Read only" onChange={() => {}} readOnly />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('readonly')
  })

  it('renders with different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel']
    
    types.forEach(type => {
      const { rerender } = render(<TextInput type={type as any} value="" onChange={() => {}} />)
      const input = screen.getByRole(type === 'number' ? 'spinbutton' : 'textbox')
      expect(input).toHaveAttribute('type', type)
      rerender(<></>)
    })
  })

  it('accepts additional className', () => {
    render(<TextInput value="" onChange={() => {}} className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })
}) 