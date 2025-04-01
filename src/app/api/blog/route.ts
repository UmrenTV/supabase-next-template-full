import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock database - in a real app, this would be a database connection
const posts = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and its new features.',
    coverImage: '/blog/nextjs-cover.jpg',
    author: 'John Doe',
    date: '2024-03-15',
    category: 'Development',
    readTime: '5 min read',
    commentsCount: 12,
    tags: ['Next.js', 'React', 'Web Development']
  },
  // ... add more posts
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search')?.toLowerCase()
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const sort = searchParams.get('sort') || 'latest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')

    // Filter posts
    let filteredPosts = posts.filter(post => {
      const matchesSearch = !search || 
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.author.toLowerCase().includes(search)

      const matchesCategory = !category || category === 'All' || post.category === category
      const matchesTag = !tag || post.tags.includes(tag)

      return matchesSearch && matchesCategory && matchesTag
    })

    // Sort posts
    filteredPosts.sort((a, b) => {
      switch (sort) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'popular':
          return b.commentsCount - a.commentsCount
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    // Calculate pagination
    const total = filteredPosts.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit

    // Get paginated posts
    const paginatedPosts = filteredPosts.slice(start, end)

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST endpoint for creating new blog posts (protected in production)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'author', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // In a real app, save to database and handle image uploads
    const newPost = {
      id: Date.now().toString(),
      ...body,
      date: new Date().toISOString().split('T')[0],
      commentsCount: 0,
      tags: body.tags || []
    }

    // Add to mock database
    posts.unshift(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 