import { render, screen, fireEvent } from '@testing-library/react'
import { Radio } from './radio'

describe('Radio', () => {
  it('renders with default props', () => {
    render(
      <Radio
        name="test"
        value="1"
        checked={false}
        onChange={() => {}}
      />
    )
    const radio = screen.getByRole('radio')
    expect(radio).toBeInTheDocument()
    expect(radio).toHaveClass('radio')
  })

  it('renders with label', () => {
    render(
      <Radio
        label="Option 1"
        name="test"
        value="1"
        checked={false}
        onChange={() => {}}
      />
    )
    const label = screen.getByText('Option 1')
    expect(label).toBeInTheDocument()
  })

  it('handles checked state changes', () => {
    const handleChange = jest.fn()
    render(
      <Radio
        name="test"
        value="1"
        checked={false}
        onChange={handleChange}
      />
    )
    
    const radio = screen.getByRole('radio')
    fireEvent.click(radio)
    expect(handleChange).toHaveBeenCalledWith('1')
  })

  it('renders with error message', () => {
    render(
      <Radio
        name="test"
        value="1"
        checked={false}
        onChange={() => {}}
        error="Please select an option"
      />
    )
    const errorMessage = screen.getByText('Please select an option')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables radio when disabled prop is true', () => {
    render(
      <Radio
        name="test"
        value="1"
        checked={false}
        onChange={() => {}}
        disabled
      />
    )
    const radio = screen.getByRole('radio')
    expect(radio).toBeDisabled()
  })

  it('accepts additional className', () => {
    render(
      <Radio
        name="test"
        value="1"
        checked={false}
        onChange={() => {}}
        className="custom-class"
      />
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('custom-class')
  })

  it('maintains checked state', () => {
    render(
      <Radio
        name="test"
        value="1"
        checked={true}
        onChange={() => {}}
      />
    )
    const radio = screen.getByRole('radio')
    expect(radio).toBeChecked()
  })
}) 