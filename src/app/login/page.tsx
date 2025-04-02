'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/organisms'
import { useAuth } from '@/lib/auth/auth-context'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const { login, user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password)
      toast.success('Login successful')
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full p-8 bg-base-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
} 