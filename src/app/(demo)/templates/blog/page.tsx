'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaCalendar, FaUser, FaFolder, FaComment, FaChevronLeft, FaChevronRight, FaEye, FaShare } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPlaceholderImage, PLACEHOLDER_IMAGES } from '@/constants/placeholders'

interface Author {
  name: string
  avatar: string
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: Author
  coverImage: string
  category: string
  tags: string[]
  views: number
}

// Expanded mock data with placeholder images
const allPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and its new features.',
    content: 'Full content here...',
    date: '2024-03-15',
    author: {
      name: 'John Doe',
      avatar: getPlaceholderImage('AVATAR_MALE', 64, 64, 'JD')
    },
    coverImage: getPlaceholderImage('BLOG_COVER', 1200, 630, 'Next.js 14'),
    category: 'Development',
    tags: ['Next.js', 'React', 'JavaScript'],
    views: 1200
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    content: 'Full content here...',
    date: '2024-03-14',
    author: {
      name: 'Jane Smith',
      avatar: getPlaceholderImage('AVATAR_FEMALE', 64, 64, 'JS')
    },
    coverImage: getPlaceholderImage('BLOG_COVER', 1200, 630, 'Web Dev Future'),
    category: 'Technology',
    tags: ['Trends', 'Web Development', 'Innovation'],
    views: 800
  },
  {
    id: '3',
    title: 'Building Scalable Applications',
    excerpt: 'Best practices and patterns for building scalable web applications.',
    content: 'Full content here...',
    date: '2024-03-13',
    author: {
      name: 'Mike Johnson',
      avatar: '/blog/authors/mike-johnson.jpg'
    },
    coverImage: '/blog/scalable-apps.jpg',
    category: 'Architecture',
    tags: ['Architecture', 'Scalability', 'Best Practices'],
    views: 1500
  },
  // Add more mock posts...
  {
    id: '4',
    title: 'Modern CSS Techniques',
    excerpt: 'Discover the latest CSS features and how to use them effectively.',
    content: 'Full content here...',
    date: '2024-03-12',
    author: {
      name: 'Sarah Wilson',
      avatar: '/blog/authors/sarah-wilson.jpg'
    },
    coverImage: '/blog/css-modern.jpg',
    category: 'Design',
    tags: ['CSS', 'Design', 'Web Development'],
    views: 600
  },
  {
    id: '5',
    title: 'TypeScript Best Practices',
    excerpt: 'Learn how to write better TypeScript code with these best practices.',
    content: 'Full content here...',
    date: '2024-03-11',
    author: {
      name: 'David Brown',
      avatar: '/blog/authors/david-brown.jpg'
    },
    coverImage: '/blog/typescript.jpg',
    category: 'Development',
    tags: ['TypeScript', 'Development', 'Best Practices'],
    views: 1000
  },
  {
    id: '6',
    title: 'React Performance Optimization',
    excerpt: 'Tips and tricks for optimizing your React applications.',
    content: 'Full content here...',
    date: '2024-03-10',
    author: {
      name: 'Emily Chen',
      avatar: '/blog/authors/emily-chen.jpg'
    },
    coverImage: '/blog/react-perf.jpg',
    category: 'Development',
    tags: ['React', 'Performance Optimization', 'Web Development'],
    views: 1800
  }
]

const categories = [
  'All',
  'Development',
  'Technology',
  'Architecture',
  'Design',
  'Business',
  'Marketing'
]

const tags = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML']

const POSTS_PER_PAGE = 6

// Add sorting options
type SortOption = 'latest' | 'oldest' | 'popular' | 'title'

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const router = useRouter()
  const params = useSearchParams()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState(params.get('search') || '')
  const [selectedTag, setSelectedTag] = useState<string | undefined>(
    params.get('tag') || undefined
  )
  
  const searchQuery = params.get('search') || ''
  const selectedCategory = params.get('category') || 'All'
  const sortBy = (params.get('sort') || 'latest') as SortOption
  const currentPage = parseInt(params.get('page') || '1')

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    const newTag = selectedTag === tag ? undefined : tag
    setSelectedTag(newTag)
    updateFilters({ tag: newTag, page: 1 })
  }

  // Filter and paginate posts
  const filteredPosts = useMemo(() => {
    let filtered = [...allPosts]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default: // latest
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedTag, sortBy])

  // Calculate pagination
  const totalPosts = filteredPosts.length
  const postsPerPage = 6
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // Update URL with filters
  const updateFilters = ({
    search = searchQuery,
    category = selectedCategory,
    tag = selectedTag,
    sort = sortBy,
    page = 1
  }: {
    search?: string;
    category?: string;
    tag?: string | undefined;
    sort?: SortOption;
    page?: number;
  }) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category !== 'All') params.set('category', category)
    if (tag) params.set('tag', tag)
    if (sort !== 'latest') params.set('sort', sort)
    if (page > 1) params.set('page', page.toString())

    router.push(`/templates/blog?${params.toString()}`)
  }

  // Add reading time estimation
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Add share functionality
  const handleShare = async (post: BlogPost) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.origin + `/templates/blog/${post.id}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-12">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-8">Our Blog</h1>
            <p className="text-xl mb-8">
              Discover the latest insights, tutorials, and updates from our team
            </p>
            {/* Search Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                updateFilters({ search: searchInput, page: 1 })
              }}
              className="flex justify-center"
            >
              <div className="join w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="input input-bordered join-item flex-1"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary join-item">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <span className="badge badge-primary gap-2">
                  Search: {searchQuery}
                  <button onClick={() => updateFilters({ search: '', page: 1 })}>×</button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="badge badge-primary gap-2">
                  {selectedCategory}
                  <button onClick={() => updateFilters({ category: 'All', page: 1 })}>×</button>
                </span>
              )}
              {selectedTag && (
                <span className="badge badge-primary gap-2">
                  {selectedTag}
                  <button onClick={() => handleTagSelect(selectedTag)}>×</button>
                </span>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <select
                className="select select-bordered"
                value={selectedCategory}
                onChange={(e) =>
                  updateFilters({ category: e.target.value, page: 1 })
                }
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered"
                value={sortBy}
                onChange={(e) =>
                  updateFilters({
                    sort: e.target.value as SortOption,
                    page: 1,
                  })
                }
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Articles Grid */}
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {currentPosts.map((post) => (
                    <article
                      key={post.id}
                      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <figure className="relative h-48 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transform hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </figure>
                      <div className="card-body">
                        <div className="flex items-center gap-4 text-sm text-base-content/70 mb-2">
                          <span className="flex items-center gap-1">
                            <FaCalendar className="w-4 h-4" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEye className="w-4 h-4" />
                            {post.views.toLocaleString()} views
                          </span>
                          <span className="flex items-center gap-1">
                            <FaFolder className="w-4 h-4" />
                            {post.category}
                          </span>
                        </div>
                        <Link
                          href={`/templates/blog/${post.id}`}
                          className="card-title hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-base-content/70">
                          {post.excerpt}
                        </p>
                        <div className="card-actions justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <div className="avatar">
                              <div className="w-8 h-8 rounded-full relative">
                                <Image
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  fill
                                  className="rounded-full"
                                  sizes="32px"
                                />
                              </div>
                            </div>
                            <span className="text-sm">{post.author.name}</span>
                          </div>
                          <button
                            onClick={() => handleShare(post)}
                            className="btn btn-ghost btn-sm"
                            title="Share"
                          >
                            <FaShare className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => handleTagSelect(tag)}
                              className="badge badge-outline hover:badge-primary transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        updateFilters({ page: Math.max(1, currentPage - 1) })
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span className="btn btn-disabled">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        updateFilters({
                          page: Math.min(totalPages, currentPage + 1),
                        })
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-base-content/70">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-8">
            {/* Categories */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`block w-full text-left px-4 py-2 rounded ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-content'
                          : 'hover:bg-base-300'
                      }`}
                      onClick={() =>
                        updateFilters({ category: category, page: 1 })
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      className={`btn btn-sm ${
                        selectedTag === tag
                          ? 'btn-primary'
                          : 'btn-outline'
                      }`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Newsletter</h3>
                <p className="text-sm text-base-content/70 mb-4">
                  Subscribe to our newsletter for the latest updates
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    // Handle newsletter subscription
                  }}
                >
                  <div className="join w-full">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="input input-bordered join-item flex-1"
                      required
                    />
                    <button type="submit" className="btn btn-primary join-item">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}