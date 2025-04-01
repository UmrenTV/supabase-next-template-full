'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaHeart, FaStar, FaFilter, FaSort, FaSearch } from 'react-icons/fa'
import { getPlaceholderImage } from '@/constants/placeholders'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  tags: string[]
  inStock: boolean
  discount?: number
}

const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys'
]

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 199.99,
    originalPrice: 249.99,
    image: getPlaceholderImage('PRODUCT', 400, 400, 'Headphones'),
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    tags: ['wireless', 'audio', 'premium'],
    inStock: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring features.',
    price: 299.99,
    image: getPlaceholderImage('PRODUCT', 400, 400, 'Smart Watch'),
    category: 'Electronics',
    rating: 4.8,
    reviews: 256,
    tags: ['wearable', 'smart', 'fitness'],
    inStock: true
  },
  {
    id: '3',
    name: 'Designer Backpack',
    description: 'Stylish and functional backpack for everyday use.',
    price: 79.99,
    image: getPlaceholderImage('PRODUCT', 400, 400, 'Backpack'),
    category: 'Clothing',
    rating: 4.2,
    reviews: 64,
    tags: ['fashion', 'accessories', 'travel'],
    inStock: true
  },
  // Add more products...
]

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'

interface CartItem extends Product {
  quantity: number
}

export default function EcommercePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const [cart, setCart] = useState<Set<string>>(new Set())
  const [showCart, setShowCart] = useState(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Apply price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange])

  // Cart functions
  const addToCart = (product: Product) => {
    const newCart = new Set(cart)
    newCart.add(product.id)
    setCart(newCart)
  }

  const removeFromCart = (productId: string) => {
    const newCart = new Set(cart)
    newCart.delete(productId)
    setCart(newCart)
  }

  const cartTotal = Array.from(cart).reduce((total, id) => {
    const product = mockProducts.find(p => p.id === id)
    return total + (product?.price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 sticky top-0 z-50 shadow-lg">
        <div className="flex-1">
          <Link href="/templates/ecommerce" className="btn btn-ghost text-xl">
            Store
          </Link>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setShowCart(!showCart)}
            >
              <div className="indicator">
                <FaShoppingCart className="h-5 w-5" />
                {Array.from(cart).length > 0 && (
                  <span className="badge badge-sm badge-primary indicator-item">
                    {Array.from(cart).length}
                  </span>
                )}
              </div>
            </button>
            {showCart && (
              <div className="card dropdown-content z-[1] card-compact w-96 bg-base-100 shadow-xl mt-4">
                <div className="card-body">
                  <h3 className="card-title">Shopping Cart</h3>
                  {Array.from(cart).length === 0 ? (
                    <p className="text-base-content/70">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {Array.from(cart).map(id => {
                          const product = mockProducts.find(p => p.id === id)
                          return (
                            <div key={id} className="flex gap-4">
                              <div className="relative w-20 h-20">
                                <Image
                                  src={product?.image || ''}
                                  alt={product?.name || ''}
                                  fill
                                  className="rounded-lg object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{product?.name}</h4>
                                <p className="text-base-content/70">
                                  ${product?.price.toFixed(2)}
                                </p>
                              </div>
                              <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => removeFromCart(id)}
                              >
                                ×
                              </button>
                            </div>
                          )
                        })}
                      </div>
                      <div className="divider"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Total:</span>
                        <span className="text-xl">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">
                          Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="join w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered join-item flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary join-item">
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-outline gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>
            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`btn btn-sm w-full ${
                        selectedCategory === category ? 'btn-primary' : 'btn-ghost'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    className="range"
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="card bg-base-100 shadow-xl">
                  <figure className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2 badge badge-secondary">
                        Sale
                      </div>
                    )}
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {product.name}
                      {!product.inStock && (
                        <div className="badge badge-outline">Out of Stock</div>
                      )}
                    </h2>
                    <p className="text-base-content/70">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-warning'
                                : 'text-base-content/20'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-base-content/70">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-base-content/70 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="card-actions justify-between items-center mt-4">
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                          <span key={tag} className="badge badge-outline">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className={`btn btn-primary ${
                          cart.has(product.id) ? 'btn-outline' : ''
                        }`}
                        onClick={() => {
                          if (cart.has(product.id)) {
                            removeFromCart(product.id)
                          } else {
                            addToCart(product)
                          }
                        }}
                        disabled={!product.inStock}
                      >
                        {cart.has(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 