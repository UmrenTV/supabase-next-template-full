import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unauthorized - Next.js Template',
  description: 'You do not have permission to access this page'
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-lg mb-8 opacity-70">
          You do not have permission to access this page.
        </p>
        <div className="space-y-4">
          <Link href="/dashboard" className="btn btn-primary w-full">
            Go to Dashboard
          </Link>
          <Link href="/" className="btn btn-ghost w-full">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
} 