'use client'

import { useState } from 'react'
import { FaRocket, FaShieldAlt, FaChartLine, FaUsers, FaCheck, FaStar } from 'react-icons/fa'
import Image from 'next/image'

interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    content: 'This platform has transformed how we manage our business. The analytics and insights are invaluable.',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    content: 'The user interface is intuitive and the features are exactly what we needed. Highly recommended!',
    avatar: 'https://daisyui.com/images/stock/photo-1472099645785-5658abf4ff4e.jpg',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    content: "We've seen a 40% increase in engagement since implementing this solution. It's been a game-changer.",
    avatar: 'https://daisyui.com/images/stock/photo-1438761681033-6461ffad8d80.jpg',
    rating: 5
  }
]

const features = [
  {
    icon: FaRocket,
    title: 'Lightning Fast',
    description: 'Optimized performance for the best user experience'
  },
  {
    icon: FaShieldAlt,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime'
  },
  {
    icon: FaChartLine,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights and reporting tools'
  },
  {
    icon: FaUsers,
    title: 'Team Collaboration',
    description: 'Seamless teamwork with real-time updates'
  }
]

export default function MarketingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-8">
              Transform Your Business with Our Platform
            </h1>
            <p className="text-xl mb-8">
              Streamline your operations, boost productivity, and drive growth with our comprehensive solution.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-ghost">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-200 shadow-xl">
                <div className="card-body items-center text-center">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="card-title">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm opacity-70">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their business with our platform.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Features</a>
          <a className="link link-hover">Pricing</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All rights reserved</p>
        </aside>
      </footer>
    </div>
  )
} 