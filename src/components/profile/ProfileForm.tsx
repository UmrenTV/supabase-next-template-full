'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { supabase } from '@/lib/supabase'
import { FaUser } from 'react-icons/fa'

interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  website: string
  bio: string
}

export function ProfileForm() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !profile) return

    setIsSaving(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...profile,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfile(prev => prev ? { ...prev, [name]: value } : null)
  }

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-24">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.username} />
            ) : (
              <FaUser className="w-12 h-12" />
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-sm opacity-70">Update your personal information</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            value={profile?.username || ''}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={profile?.full_name || ''}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Website</span>
          </label>
          <input
            type="url"
            name="website"
            value={profile?.website || ''}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="https://"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            name="bio"
            value={profile?.bio || ''}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => fetchProfile()}
            className="btn btn-ghost"
            disabled={isSaving}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
} 