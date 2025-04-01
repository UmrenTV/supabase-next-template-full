import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export type Role = 'user' | 'admin' | 'editor'

export async function checkRole(requiredRole: Role) {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (!profile || profile.role !== requiredRole) {
    redirect('/unauthorized')
  }
}

export function withRoleProtection<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: Role
) {
  return async function ProtectedComponent(props: P) {
    await checkRole(requiredRole)
    return React.createElement(Component, props)
  }
} 