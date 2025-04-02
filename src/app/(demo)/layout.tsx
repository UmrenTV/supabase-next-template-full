'use client'

import Link from 'next/link'
import { AuthProvider } from '@/lib/auth/auth-context'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-200">
        <div className="navbar bg-base-100 shadow-lg">
          <div className="container mx-auto">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl">
                Next.js Template
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <ul className="menu menu-horizontal px-1 gap-4">
                <li>
                  <Link href="/components" className="text-base-content hover:text-primary">Components</Link>
                </li>
                <li>
                  <Link href="/templates" className="text-base-content hover:text-primary">Templates</Link>
                </li>
              </ul>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
        <div className="container mx-auto py-8">
          {children}
        </div>
      </div>
    </AuthProvider>
  )
} 