'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export function LoginForm() {
  const { signIn, error, loading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsSubmitting(true)
    try {
      await signIn(provider)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error.message}</span>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={() => handleSocialLogin('google')}
          disabled={isSubmitting || loading}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        <button
          onClick={() => handleSocialLogin('github')}
          disabled={isSubmitting || loading}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGithub className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>

      <div className="divider my-8">OR</div>

      <p className="text-center text-sm">
        Don't have an account?{' '}
        <a href="/auth/register" className="link link-primary">
          Sign up
        </a>
      </p>
    </div>
  )
} 