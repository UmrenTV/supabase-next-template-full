'use client'

import { useEffect } from 'react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Admin Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-error mb-4">Something went wrong!</h2>
        <p className="mb-4 opacity-70">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="btn btn-primary w-full"
          >
            Try again
          </button>
          <a href="/dashboard" className="btn btn-ghost w-full">
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
} 