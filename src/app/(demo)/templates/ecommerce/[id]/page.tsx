'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaHeart, FaStar, FaChevronLeft, FaChevronRight, FaShare } from 'react-icons/fa'

interface Review {
  id: string
  author: string
  rating: number
  date: string
  content: string
  helpful: number
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviews: Review[]
  tags: string[]
  inStock: boolean
  features: string[]
  specifications: Record<string, string>
}

// Mock product data
const product: Product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'High-quality wireless headphones with noise cancellation. Experience crystal-clear sound and ultimate comfort.',
  price: 199.99,
  originalPrice: 249.99,
  images: [
    '/ecommerce/headphones.jpg',
    '/ecommerce/headphones-2.jpg',
    '/ecommerce/headphones-3.jpg',
    '/ecommerce/headphones-4.jpg'
  ],
  category: 'Electronics',
  rating: 4.5,
  reviews: [
    {
      id: '1',
      author: 'John Smith',
      rating: 5,
      date: '2024-03-15',
      content: 'Amazing sound quality and very comfortable for long listening sessions.',
      helpful: 12
    },
    {
      id: '2',
      author: 'Sarah Johnson',
      rating: 4,
      date: '2024-03-14',
      content: 'Great headphones, but the battery life could be better.',
      helpful: 8
    }
  ],
  tags: ['Wireless', 'Audio', 'Noise Cancelling'],
  inStock: true,
  features: [
    'Active Noise Cancellation',
    'Up to 30 hours battery life',
    'Bluetooth 5.0',
    'Touch controls',
    'Voice assistant support'
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 Ohm',
    'Battery Life': '30 hours',
    'Charging Time': '2 hours',
    'Weight': '250g'
  }
}

const relatedProducts = [
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 149.99,
    image: '/ecommerce/smartwatch.jpg',
    rating: 4.8
  },
  // Add more related products...
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showReviews, setShowReviews] = useState(false)

  const handleAddToCart = () => {
    // In a real app, this would add to cart
    console.log('Adding to cart:', { ...product, quantity })
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Breadcrumb */}
      <div className="bg-base-100 py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link href="/templates/ecommerce">Store</Link></li>
              <li><Link href="/templates/ecommerce">{product.category}</Link></li>
              <li>{product.name}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="card bg-base-100 shadow-xl">
              <figure className="relative aspect-square">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex gap-4 overflow-x-auto py-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                        index === selectedImage ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                
                <div className="flex items-center gap-4 my-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-warning'
                            : 'text-base-content/20'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    className="link link-hover"
                    onClick={() => setShowReviews(true)}
                  >
                    {product.reviews.length} Reviews
                  </button>
                </div>

                <p className="text-base-content/70">{product.description}</p>

                <div className="flex items-baseline gap-4 mt-4">
                  <span className="text-3xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-base-content/70 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="divider"></div>

                {/* Features */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="divider"></div>

                {/* Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="join">
                      <button
                        className="btn join-item"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        -
                      </button>
                      <span className="btn join-item no-animation">
                        {quantity}
                      </span>
                      <button
                        className="btn join-item"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-primary flex-1 gap-2"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-outline gap-2 flex-1">
                      <FaHeart />
                      Add to Wishlist
                    </button>
                    <button className="btn btn-outline gap-2">
                      <FaShare />
                      Share
                    </button>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Specifications */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Specifications</h2>
                  <div className="overflow-x-auto">
                    <table className="table">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <th className="font-medium">{key}</th>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b last:border-b-0 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{review.author}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FaStar
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-warning'
                                    : 'text-base-content/20'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-base-content/70">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <button className="btn btn-ghost btn-sm gap-2">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                    <p className="mt-4">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(product => (
              <Link
                key={product.id}
                href={`/templates/ecommerce/${product.id}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
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
                  </div>
                  <p className="text-xl font-bold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 