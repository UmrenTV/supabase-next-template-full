import { render, screen, fireEvent } from '@testing-library/react'
import { Textarea } from './textarea'

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea value="" onChange={() => {}} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass('textarea', 'textarea-bordered', 'resize')
    expect(textarea).toHaveAttribute('rows', '3')
  })

  it('renders with label', () => {
    render(<Textarea label="Description" value="" onChange={() => {}} />)
    const label = screen.getByText('Description')
    expect(label).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter description" value="" onChange={() => {}} />)
    const textarea = screen.getByPlaceholderText('Enter description')
    expect(textarea).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Textarea value="" onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Test content' } })
    expect(handleChange).toHaveBeenCalledWith('Test content')
  })

  it('renders with error message', () => {
    render(<Textarea value="" onChange={() => {}} error="Required field" />)
    const errorMessage = screen.getByText('Required field')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveClass('text-error')
  })

  it('disables textarea when disabled prop is true', () => {
    render(<Textarea value="" onChange={() => {}} disabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('makes textarea read-only when readOnly prop is true', () => {
    render(<Textarea value="Read only content" onChange={() => {}} readOnly />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('readonly')
  })

  it('renders with custom rows and cols', () => {
    render(<Textarea value="" onChange={() => {}} rows={5} cols={50} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('cols', '50')
  })

  it('renders with different resize options', () => {
    const resizeOptions = ['none', 'both', 'horizontal', 'vertical']
    
    resizeOptions.forEach(resize => {
      const { rerender } = render(<Textarea value="" onChange={() => {}} resize={resize as any} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass(`resize-${resize === 'both' ? '' : resize}`)
      rerender(<></>)
    })
  })

  it('accepts additional className', () => {
    render(<Textarea value="" onChange={() => {}} className="custom-class" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('custom-class')
  })
}) 