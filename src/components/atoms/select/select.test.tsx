import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from './select'

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true }
]

describe('Select', () => {
  it('renders with default props', () => {
    render(<Select value="" onChange={() => {}} options={mockOptions} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveClass('select', 'select-bordered')
  })

  it('renders with label', () => {
    render(<Select label="Select Option" value="" onChange={() => {}} options={mockOptions} />)
    const label = screen.getByText('Select Option')
    expect(label).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<Select value="" onChange={() => {}} options={mockOptions} placeholder="Choose..." />)
    const placeholder = screen.getByText('Choose...')
    expect(placeholder).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Select value="" onChange={handleChange} options={mockOptions} />)
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '1' } })
    expect(handleChange).toHaveBeenCalledWith('1')
  })

  it('renders with error message', () => {
    render(<Select value="" onChange={() => {}} options={mockOptions} error="Required field" />)
    const errorMessage = screen.getByText('Required field')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables select when disabled prop is true', () => {
    render(<Select value="" onChange={() => {}} options={mockOptions} disabled />)
    const select = screen.getByRole('combobox')
    expect(select).toBeDisabled()
  })

  it('renders disabled options', () => {
    render(<Select value="" onChange={() => {}} options={mockOptions} />)
    const disabledOption = screen.getByText('Option 3')
    expect(disabledOption).toHaveAttribute('disabled')
  })

  it('accepts additional className', () => {
    render(<Select value="" onChange={() => {}} options={mockOptions} className="custom-class" />)
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('custom-class')
  })
}) 