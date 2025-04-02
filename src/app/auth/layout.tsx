'use client'

import { AuthProvider } from '@/lib/auth/auth-context'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-200">
        {children}
      </div>
    </AuthProvider>
  )
} 