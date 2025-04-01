import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock database - in a real app, this would be a database connection
const posts = new Map([
  ['1', {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: `
      <p>Next.js 14 brings exciting new features and improvements to the React framework...</p>
      // ... rest of the content
    `,
    coverImage: '/blog/nextjs-cover.jpg',
    author: {
      name: 'John Doe',
      avatar: '/blog/authors/john-doe.jpg',
      bio: 'Senior Developer at Tech Corp. Passionate about web development and new technologies.'
    },
    date: '2024-03-15',
    category: 'Development',
    readTime: '5 min read',
    likes: 128,
    comments: 32,
    tags: ['Next.js', 'React', 'Web Development']
  }]
])

const comments = new Map([
  ['1', [
    {
      id: '1',
      postId: '1',
      author: {
        name: 'Alice Johnson',
        avatar: '/blog/authors/alice-johnson.jpg'
      },
      content: 'Great article! The section about Server Actions was particularly helpful.',
      date: '2024-03-16',
      likes: 5,
      replies: [
        {
          id: '2',
          author: {
            name: 'John Doe',
            avatar: '/blog/authors/john-doe.jpg'
          },
          content: 'Thanks Alice! Let me know if you need any clarification.',
          date: '2024-03-16',
          likes: 2,
          replies: []
        }
      ]
    }
  ]]
])

// GET endpoint for fetching a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = posts.get(params.id)
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const postComments = comments.get(params.id) || []

    return NextResponse.json({
      post,
      comments: postComments
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PATCH endpoint for updating post likes
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = posts.get(params.id)
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const { action } = await request.json()
    
    if (action === 'like') {
      post.likes += 1
    }

    return NextResponse.json({ likes: post.likes })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST endpoint for adding comments
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = posts.get(params.id)
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.content || !body.author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newComment = {
      id: Date.now().toString(),
      postId: params.id,
      author: {
        name: body.author.name,
        avatar: body.author.avatar || '/blog/authors/default-avatar.jpg'
      },
      content: body.content,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: []
    }

    // Add comment to mock database
    const postComments = comments.get(params.id) || []
    if (body.replyTo) {
      // Add reply to existing comment
      const parentComment = postComments.find(c => c.id === body.replyTo)
      if (parentComment) {
        parentComment.replies.push(newComment)
      }
    } else {
      // Add new top-level comment
      postComments.unshift(newComment)
    }
    comments.set(params.id, postComments)

    // Update comment count
    post.comments += 1

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 