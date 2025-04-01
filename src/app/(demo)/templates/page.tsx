'use client'

import Link from 'next/link'

export default function TemplatesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Layout Templates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Template */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Dashboard</h2>
            <p>A modern dashboard layout with sidebar navigation and responsive grid.</p>
            <div className="card-actions justify-end">
              <Link href="/templates/dashboard" className="btn btn-primary">View Demo</Link>
            </div>
          </div>
        </div>

        {/* Admin Panel Template */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Admin Panel</h2>
            <p>Complete admin interface with data tables, forms, and user management.</p>
            <div className="card-actions justify-end">
              <Link href="/templates/admin" className="btn btn-primary">View Demo</Link>
            </div>
          </div>
        </div>

        {/* Marketing Site Template */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Marketing Site</h2>
            <p>Landing page template with hero section, features, and contact form.</p>
            <div className="card-actions justify-end">
              <Link href="/templates/marketing" className="btn btn-primary">View Demo</Link>
            </div>
          </div>
        </div>

        {/* Blog Template */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Blog</h2>
            <p>Clean blog layout with article cards, categories, and search.</p>
            <div className="card-actions justify-end">
              <Link href="/templates/blog" className="btn btn-primary">View Demo</Link>
            </div>
          </div>
        </div>

        {/* E-commerce Template */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">E-commerce</h2>
            <p>Online store template with product grid, cart, and checkout flow.</p>
            <div className="card-actions justify-end">
              <Link href="/templates/ecommerce" className="btn btn-primary">View Demo</Link>
            </div>
          </div>
        </div>

        {/* Portfolio Template */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Portfolio</h2>
            <p>Showcase your work with a beautiful portfolio layout.</p>
            <div className="card-actions justify-end">
              <Link href="/templates/portfolio" className="btn btn-primary">View Demo</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 