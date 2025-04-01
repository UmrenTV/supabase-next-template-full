import { render, screen } from '@testing-library/react'
import { DefaultAvatar } from './default-avatar'

describe('DefaultAvatar', () => {
  it('renders with user icon when no name is provided', () => {
    render(<DefaultAvatar />)
    expect(screen.getByTestId('default-avatar')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders with initials when name is provided', () => {
    render(<DefaultAvatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<DefaultAvatar size="sm" />)
    expect(screen.getByTestId('default-avatar')).toHaveClass('w-8', 'h-8', 'text-sm')

    rerender(<DefaultAvatar size="md" />)
    expect(screen.getByTestId('default-avatar')).toHaveClass('w-12', 'h-12', 'text-base')

    rerender(<DefaultAvatar size="lg" />)
    expect(screen.getByTestId('default-avatar')).toHaveClass('w-16', 'h-16', 'text-lg')
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<DefaultAvatar className={customClass} />)
    expect(screen.getByTestId('default-avatar')).toHaveClass(customClass)
  })

  it('handles single word names', () => {
    render(<DefaultAvatar name="John" />)
    expect(screen.getByText('JO')).toBeInTheDocument()
  })

  it('handles empty name', () => {
    render(<DefaultAvatar name="" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
}) 