'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (err) {
        console.error('Failed to restore session:', err)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Wait for the session to be established
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Failed to establish session')
      
      // Get the redirectTo parameter or default to dashboard
      const redirectTo = searchParams.get('redirectTo') || '/dashboard'
      // Use the full URL for the redirect
      const fullUrl = new URL(redirectTo, window.location.origin).toString()
      router.push(fullUrl)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      router.push('/auth/login')
    } catch (err) {
      console.error('Failed to logout:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 