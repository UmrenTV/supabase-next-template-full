'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaCalendar, FaUser, FaFolder, FaShare, FaHeart, FaComment, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

interface BlogPost {
  id: string
  title: string
  content: string
  coverImage: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  date: string
  category: string
  readTime: string
  likes: number
  comments: number
  tags: string[]
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  date: string
  likes: number
  replies: Comment[]
}

// Mock data - in a real app, this would come from an API or database
const blogPost: BlogPost = {
  id: '1',
  title: 'Getting Started with Next.js 14',
  content: `
    <p>Next.js 14 brings exciting new features and improvements to the React framework. In this comprehensive guide, we'll explore the key features and how to use them effectively in your projects.</p>

    <h2>What's New in Next.js 14?</h2>
    <p>Next.js 14 introduces several major improvements:</p>
    <ul>
      <li>Server Actions are now stable</li>
      <li>Partial Prerendering (Preview)</li>
      <li>Improved Image Component</li>
      <li>Better TypeScript Support</li>
    </ul>

    <h2>Getting Started</h2>
    <p>To create a new Next.js 14 project, run:</p>
    <pre><code>npx create-next-app@latest my-app</code></pre>

    <h2>Key Features</h2>
    <p>Let's dive into some of the most important features:</p>

    <h3>Server Actions</h3>
    <p>Server Actions allow you to define async server functions that can be called directly from your components:</p>
    <pre><code>
    'use server'
    async function myServerAction() {
      // Server-side code here
    }
    </code></pre>

    <h3>Partial Prerendering</h3>
    <p>This new feature allows you to prerender parts of your page while keeping other parts dynamic:</p>
    <pre><code>
    export default function Page() {
      return (
        <div>
          <StaticContent />
          <Suspense>
            <DynamicContent />
          </Suspense>
        </div>
      )
    }
    </code></pre>

    <h2>Best Practices</h2>
    <p>When working with Next.js 14, keep these best practices in mind:</p>
    <ul>
      <li>Use Server Components by default</li>
      <li>Implement proper error boundaries</li>
      <li>Optimize images with the new Image component</li>
      <li>Leverage TypeScript for better type safety</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Next.js 14 represents a significant step forward in React development. With its new features and improvements, it's now easier than ever to build fast, scalable web applications.</p>
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
}

const comments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Alice Johnson',
      avatar: '/blog/authors/alice-johnson.jpg'
    },
    content: 'Great article! The section about Server Actions was particularly helpful. Looking forward to implementing these features in my next project.',
    date: '2024-03-16',
    likes: 5,
    replies: [
      {
        id: '2',
        author: {
          name: 'John Doe',
          avatar: '/blog/authors/john-doe.jpg'
        },
        content: 'Thanks Alice! Let me know if you need any clarification on Server Actions.',
        date: '2024-03-16',
        likes: 2,
        replies: []
      }
    ]
  },
  {
    id: '3',
    author: {
      name: 'Bob Wilson',
      avatar: '/blog/authors/bob-wilson.jpg'
    },
    content: 'The Partial Prerendering feature looks promising. Can you share more examples of how to use it effectively?',
    date: '2024-03-16',
    likes: 3,
    replies: []
  }
]

const relatedPosts = [
  {
    id: '2',
    title: 'The Future of Web Development',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    coverImage: '/blog/webdev-future.jpg',
    date: '2024-03-14'
  },
  {
    id: '3',
    title: 'Building Scalable Applications',
    excerpt: 'Best practices and patterns for building scalable web applications.',
    coverImage: '/blog/scalable-apps.jpg',
    date: '2024-03-13'
  }
]

export default function BlogPostPage() {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // In a real app, this would send the comment to an API
    setTimeout(() => {
      setIsSubmitting(false)
      setNewComment('')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="flex items-center justify-center gap-4 text-sm text-base-content/70 mb-4">
              <span className="flex items-center gap-1">
                <FaCalendar />
                {blogPost.date}
              </span>
              <span className="flex items-center gap-1">
                <FaUser />
                {blogPost.author.name}
              </span>
              <span className="flex items-center gap-1">
                <FaFolder />
                {blogPost.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogPost.title}</h1>
            <p className="text-base-content/70 mb-4">{blogPost.readTime}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {blogPost.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="badge badge-primary"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <div className="flex-1">
            <article className="prose prose-lg max-w-none">
              <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={blogPost.coverImage}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </article>

            {/* Article Actions */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <div className="flex items-center gap-4">
                <button className="btn btn-ghost gap-2">
                  <FaHeart />
                  {blogPost.likes}
                </button>
                <button className="btn btn-ghost gap-2">
                  <FaComment />
                  {blogPost.comments}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn btn-ghost btn-circle">
                  <FaFacebook />
                </button>
                <button className="btn btn-ghost btn-circle">
                  <FaTwitter />
                </button>
                <button className="btn btn-ghost btn-circle">
                  <FaLinkedin />
                </button>
              </div>
            </div>

            {/* Author Section */}
            <div className="card bg-base-100 shadow-xl mt-8">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{blogPost.author.name}</h3>
                    <p className="text-base-content/70">{blogPost.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Comments ({blogPost.comments})</h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="form-control">
                  <textarea
                    className="textarea textarea-bordered h-32"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.map((comment) => (
                  <div key={comment.id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold">{comment.author.name}</h4>
                          <p className="text-sm text-base-content/70">{comment.date}</p>
                        </div>
                      </div>
                      <p>{comment.content}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <button className="btn btn-ghost btn-sm gap-2">
                          <FaHeart />
                          {comment.likes}
                        </button>
                        <button className="btn btn-ghost btn-sm">Reply</button>
                      </div>

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-4 pl-8 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="card bg-base-200">
                              <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="relative w-10 h-10">
                                    <Image
                                      src={reply.author.avatar}
                                      alt={reply.author.name}
                                      fill
                                      className="rounded-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-bold">{reply.author.name}</h4>
                                    <p className="text-sm text-base-content/70">{reply.date}</p>
                                  </div>
                                </div>
                                <p>{reply.content}</p>
                                <div className="flex items-center gap-4 mt-4">
                                  <button className="btn btn-ghost btn-sm gap-2">
                                    <FaHeart />
                                    {reply.likes}
                                  </button>
                                  <button className="btn btn-ghost btn-sm">Reply</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-8">
            {/* Related Posts */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="flex gap-4 hover:bg-base-200 p-2 rounded-lg transition-colors"
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium hover:text-primary">{post.title}</h4>
                        <p className="text-sm text-base-content/70">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Subscribe to Newsletter</h3>
                <p className="text-base-content/70">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <div className="form-control mt-4">
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                    />
                    <button className="btn btn-primary">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 