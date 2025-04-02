'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/organisms/login-form/login-form'
import { useAuth } from '@/lib/auth/auth-context'
import { toast } from 'react-hot-toast'

export default function LoginClient() {
  const { login, user, loading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password)
      toast.success('Login successful')
    } catch (err) {
      toast.error('Invalid credentials')
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={loading}
          error={error}
        />
      </div>
    </div>
  )
} 