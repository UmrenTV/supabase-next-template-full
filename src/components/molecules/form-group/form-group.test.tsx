import { render, screen } from '@testing-library/react'
import { FormGroup } from './form-group'

describe('FormGroup', () => {
  it('renders with default props', () => {
    render(<FormGroup>Test Content</FormGroup>)
    const content = screen.getByText('Test Content')
    expect(content).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<FormGroup label="Test Label">Test Content</FormGroup>)
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  it('renders with required indicator', () => {
    render(<FormGroup label="Test Label" required>Test Content</FormGroup>)
    const requiredIndicator = screen.getByText('*')
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveClass('text-error')
  })

  it('renders with error message', () => {
    render(<FormGroup error="Test Error">Test Content</FormGroup>)
    const errorMessage = screen.getByText('Test Error')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('accepts additional className', () => {
    render(<FormGroup className="custom-class">Test Content</FormGroup>)
    const container = screen.getByText('Test Content').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    render(
      <FormGroup>
        <input type="text" />
        <button>Submit</button>
      </FormGroup>
    )
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
}) 