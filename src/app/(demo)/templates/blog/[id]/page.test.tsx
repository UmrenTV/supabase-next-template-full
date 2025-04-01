import { render, screen, fireEvent } from '@testing-library/react'
import BlogPostPage from './page'

describe('BlogPostPage', () => {
  it('renders the blog post page with all sections', () => {
    render(<BlogPostPage />)

    // Check hero section
    expect(screen.getByText('Getting Started with Next.js 14')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()

    // Check article content
    expect(screen.getByText("What's New in Next.js 14?")).toBeInTheDocument()
    expect(screen.getByText('Getting Started')).toBeInTheDocument()
    expect(screen.getByText('Key Features')).toBeInTheDocument()
    expect(screen.getByText('Best Practices')).toBeInTheDocument()
    expect(screen.getByText('Conclusion')).toBeInTheDocument()

    // Check article actions
    expect(screen.getByText('128')).toBeInTheDocument() // Likes count
    expect(screen.getByText('32')).toBeInTheDocument() // Comments count
    expect(screen.getByText('Share')).toBeInTheDocument()

    // Check author section
    expect(screen.getByText('Senior Developer at Tech Corp.')).toBeInTheDocument()

    // Check related posts
    expect(screen.getByText('Related Posts')).toBeInTheDocument()
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument()
    expect(screen.getByText('Building Scalable Applications')).toBeInTheDocument()

    // Check newsletter section
    expect(screen.getByText('Subscribe to Newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('renders code blocks correctly', () => {
    render(<BlogPostPage />)
    
    expect(screen.getByText('npx create-next-app@latest my-app')).toBeInTheDocument()
    expect(screen.getByText("'use server'")).toBeInTheDocument()
    expect(screen.getByText('async function myServerAction()')).toBeInTheDocument()
  })

  it('renders lists correctly', () => {
    render(<BlogPostPage />)
    
    // Check features list
    expect(screen.getByText('Server Actions are now stable')).toBeInTheDocument()
    expect(screen.getByText('Partial Prerendering (Preview)')).toBeInTheDocument()
    expect(screen.getByText('Improved Image Component')).toBeInTheDocument()
    expect(screen.getByText('Better TypeScript Support')).toBeInTheDocument()

    // Check best practices list
    expect(screen.getByText('Use Server Components by default')).toBeInTheDocument()
    expect(screen.getByText('Implement proper error boundaries')).toBeInTheDocument()
    expect(screen.getByText('Optimize images with the new Image component')).toBeInTheDocument()
    expect(screen.getByText('Leverage TypeScript for better type safety')).toBeInTheDocument()
  })

  it('renders author information correctly', () => {
    render(<BlogPostPage />)
    
    const authorSection = screen.getByText('John Doe').closest('div')
    expect(authorSection).toHaveTextContent('Senior Developer at Tech Corp')
    expect(authorSection).toHaveTextContent('Passionate about web development and new technologies')
  })

  it('renders related posts with correct information', () => {
    render(<BlogPostPage />)
    
    const relatedPosts = screen.getAllByText(/Future of Web|Building Scalable/)
    expect(relatedPosts).toHaveLength(2)
    
    expect(screen.getByText('2024-03-14')).toBeInTheDocument()
    expect(screen.getByText('2024-03-13')).toBeInTheDocument()
  })

  it('renders article actions with correct counts', () => {
    render(<BlogPostPage />)
    
    const actionsSection = screen.getByText('128').closest('div')
    expect(actionsSection).toHaveTextContent('128')
    expect(actionsSection).toHaveTextContent('32')
    expect(actionsSection).toHaveTextContent('Share')
  })
}) 