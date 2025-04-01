import { render, screen, fireEvent } from '@testing-library/react'
import { PhotoUpload } from './photo-upload'

describe('PhotoUpload', () => {
  const mockOnPhotoChange = jest.fn()

  beforeEach(() => {
    mockOnPhotoChange.mockClear()
  })

  it('renders with default state', () => {
    render(<PhotoUpload onPhotoChange={mockOnPhotoChange} />)
    expect(screen.getByText('Upload a photo')).toBeInTheDocument()
  })

  it('renders with current photo', () => {
    const currentPhoto = 'https://example.com/photo.jpg'
    render(<PhotoUpload currentPhoto={currentPhoto} onPhotoChange={mockOnPhotoChange} />)
    const img = screen.getByAltText('Preview')
    expect(img).toHaveAttribute('src', currentPhoto)
    expect(screen.getByText('Click to change photo')).toBeInTheDocument()
  })

  it('handles file selection', () => {
    render(<PhotoUpload onPhotoChange={mockOnPhotoChange} />)
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const input = screen.getByRole('button', { name: /upload/i })
    fireEvent.click(input)
    const fileInput = screen.getByTestId('file-input')
    fireEvent.change(fileInput, { target: { files: [file] } })
    expect(mockOnPhotoChange).toHaveBeenCalledWith(file)
  })

  it('handles photo removal', () => {
    const currentPhoto = 'https://example.com/photo.jpg'
    render(<PhotoUpload currentPhoto={currentPhoto} onPhotoChange={mockOnPhotoChange} />)
    const removeButton = screen.getByRole('button', { name: /remove/i })
    fireEvent.click(removeButton)
    expect(screen.getByText('Upload a photo')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-class'
    render(<PhotoUpload onPhotoChange={mockOnPhotoChange} className={customClass} />)
    expect(screen.getByTestId('photo-upload-container')).toHaveClass(customClass)
  })
}) 