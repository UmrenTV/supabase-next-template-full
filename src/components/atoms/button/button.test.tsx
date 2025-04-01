import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button label="Click me" />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-md')
  })

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'accent', 'ghost', 'link', 'outline']
    
    variants.forEach(variant => {
      const { rerender } = render(<Button label="Click me" variant={variant as any} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass(`btn-${variant}`)
      rerender(<></>)
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg']
    
    sizes.forEach(size => {
      const { rerender } = render(<Button label="Click me" size={size as any} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass(`btn-${size}`)
      rerender(<></>)
    })
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button label="Click me" onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    render(<Button label="Click me" disabled />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button label="Click me" loading />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('loading')
    expect(button).toBeDisabled()
  })

  it('accepts additional className', () => {
    render(<Button label="Click me" className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('renders with correct type', () => {
    const types = ['button', 'submit', 'reset']
    
    types.forEach(type => {
      const { rerender } = render(<Button label="Click me" type={type as any} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', type)
      rerender(<></>)
    })
  })
}) 