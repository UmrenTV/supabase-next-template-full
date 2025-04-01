import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from './login-form'

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders with default props', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles form submission with valid data', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  it('shows error message when submitting empty form', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  it('disables form when loading', () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading />)
    
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/password/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
  })

  it('displays external error message', () => {
    render(<LoginForm onSubmit={mockOnSubmit} error="Invalid credentials" />)
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
  })

  it('accepts additional className', () => {
    render(<LoginForm onSubmit={mockOnSubmit} className="custom-class" />)
    const form = screen.getByRole('form')
    expect(form).toHaveClass('custom-class')
  })
}) 