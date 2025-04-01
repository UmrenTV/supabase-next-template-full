import { render, screen } from '@testing-library/react'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'

describe('InputGroup', () => {
  it('renders with default props', () => {
    render(<InputGroup>Test Content</InputGroup>)
    const container = screen.getByText('Test Content').parentElement
    expect(container).toHaveClass('join', 'w-full')
  })

  it('accepts additional className', () => {
    render(<InputGroup className="custom-class">Test Content</InputGroup>)
    const container = screen.getByText('Test Content').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('renders with InputGroupAddon and InputGroupInput', () => {
    render(
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput>
          <input type="text" placeholder="Username" />
        </InputGroupInput>
      </InputGroup>
    )
    const addon = screen.getByText('@')
    const input = screen.getByPlaceholderText('Username')
    expect(addon).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(addon.parentElement).toHaveClass('join-item')
    expect(input.parentElement?.parentElement).toHaveClass('join-item', 'flex-1')
  })

  it('renders multiple addons', () => {
    render(
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput>
          <input type="text" placeholder="Username" />
        </InputGroupInput>
        <InputGroupAddon>.com</InputGroupAddon>
      </InputGroup>
    )
    const addons = screen.getAllByRole('generic').filter(el => el.classList.contains('join-item'))
    expect(addons).toHaveLength(3)
  })
}) 