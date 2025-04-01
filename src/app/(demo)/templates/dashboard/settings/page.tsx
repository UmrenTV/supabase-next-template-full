'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DashboardLayout } from '@/components/organisms/dashboard-layout/dashboard-layout'
import { PhotoUpload } from '@/components/molecules/photo-upload/photo-upload'
import { 
  FaUser, 
  FaLock, 
  FaBell, 
  FaShieldAlt, 
  FaSave, 
  FaEnvelope, 
  FaMobileAlt, 
  FaUserFriends, 
  FaChartLine, 
  FaCog,
  FaSpinner
} from 'react-icons/fa'
import { 
  profileSchema, 
  securitySchema, 
  notificationSchema, 
  privacySchema,
  updateProfile,
  updateSecurity,
  updateNotifications,
  updatePrivacy
} from './actions'
import { toast } from 'react-hot-toast'

type ProfileFormData = z.infer<typeof profileSchema>
type SecurityFormData = z.infer<typeof securitySchema>
type NotificationFormData = z.infer<typeof notificationSchema>
type PrivacyFormData = z.infer<typeof privacySchema>

export default function SettingsPage() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState({
    profile: false,
    security: false,
    notifications: false,
    privacy: false
  })

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'John Doe',
      email: 'john@example.com',
      bio: 'Software Developer',
    }
  })

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  })

  const notificationForm = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    }
  })

  const privacyForm = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: 'public',
      activityStatus: 'online',
      dataCollection: true,
      thirdPartyAccess: false,
    }
  })

  const handlePhotoChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfilePhoto(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(prev => ({ ...prev, profile: true }))
      const result = await updateProfile('user123', data)
      if (result.success) {
        toast.success('Profile updated successfully')
      } else {
        toast.error(result.error || 'Failed to update profile')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(prev => ({ ...prev, profile: false }))
    }
  }

  const onSecuritySubmit = async (data: SecurityFormData) => {
    try {
      setIsSubmitting(prev => ({ ...prev, security: true }))
      const result = await updateSecurity('user123', data)
      if (result.success) {
        toast.success('Security settings updated successfully')
        securityForm.reset()
      } else {
        toast.error(result.error || 'Failed to update security settings')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(prev => ({ ...prev, security: false }))
    }
  }

  const onNotificationSubmit = async (data: NotificationFormData) => {
    try {
      setIsSubmitting(prev => ({ ...prev, notifications: true }))
      const result = await updateNotifications('user123', data)
      if (result.success) {
        toast.success('Notification preferences updated successfully')
      } else {
        toast.error(result.error || 'Failed to update notification preferences')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(prev => ({ ...prev, notifications: false }))
    }
  }

  const onPrivacySubmit = async (data: PrivacyFormData) => {
    try {
      setIsSubmitting(prev => ({ ...prev, privacy: true }))
      const result = await updatePrivacy('user123', data)
      if (result.success) {
        toast.success('Privacy settings updated successfully')
      } else {
        toast.error(result.error || 'Failed to update privacy settings')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(prev => ({ ...prev, privacy: false }))
    }
  }

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaUser className="text-primary" />
              Profile Settings
            </h2>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="flex justify-center">
                <PhotoUpload
                  currentPhoto={profilePhoto}
                  onPhotoChange={handlePhotoChange}
                  className="w-32 h-32"
                  name={profileForm.getValues('fullName')}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  {...profileForm.register('fullName')}
                  className={`input input-bordered ${profileForm.formState.errors.fullName ? 'input-error' : ''}`}
                />
                {profileForm.formState.errors.fullName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {profileForm.formState.errors.fullName.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...profileForm.register('email')}
                  className={`input input-bordered ${profileForm.formState.errors.email ? 'input-error' : ''}`}
                />
                {profileForm.formState.errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {profileForm.formState.errors.email.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  {...profileForm.register('bio')}
                  className={`textarea textarea-bordered ${profileForm.formState.errors.bio ? 'textarea-error' : ''}`}
                />
                {profileForm.formState.errors.bio && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {profileForm.formState.errors.bio.message}
                    </span>
                  </label>
                )}
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isSubmitting.profile}
              >
                {isSubmitting.profile ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaLock className="text-primary" />
              Security Settings
            </h2>
            <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input
                  type="password"
                  {...securityForm.register('currentPassword')}
                  className={`input input-bordered ${securityForm.formState.errors.currentPassword ? 'input-error' : ''}`}
                />
                {securityForm.formState.errors.currentPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {securityForm.formState.errors.currentPassword.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  {...securityForm.register('newPassword')}
                  className={`input input-bordered ${securityForm.formState.errors.newPassword ? 'input-error' : ''}`}
                />
                {securityForm.formState.errors.newPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {securityForm.formState.errors.newPassword.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  {...securityForm.register('confirmPassword')}
                  className={`input input-bordered ${securityForm.formState.errors.confirmPassword ? 'input-error' : ''}`}
                />
                {securityForm.formState.errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {securityForm.formState.errors.confirmPassword.message}
                    </span>
                  </label>
                )}
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isSubmitting.security}
              >
                {isSubmitting.security ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Update Password
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaBell className="text-primary" />
              Notification Settings
            </h2>
            <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2">
                    <FaEnvelope />
                    Email Notifications
                  </span>
                  <input
                    type="checkbox"
                    {...notificationForm.register('emailNotifications')}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2">
                    <FaMobileAlt />
                    Push Notifications
                  </span>
                  <input
                    type="checkbox"
                    {...notificationForm.register('pushNotifications')}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2">
                    <FaMobileAlt />
                    SMS Notifications
                  </span>
                  <input
                    type="checkbox"
                    {...notificationForm.register('smsNotifications')}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2">
                    <FaEnvelope />
                    Marketing Emails
                  </span>
                  <input
                    type="checkbox"
                    {...notificationForm.register('marketingEmails')}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isSubmitting.notifications}
              >
                {isSubmitting.notifications ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Preferences
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FaShieldAlt className="text-primary" />
              Privacy Settings
            </h2>
            <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Visibility</span>
                </label>
                <select
                  {...privacyForm.register('profileVisibility')}
                  className={`select select-bordered ${privacyForm.formState.errors.profileVisibility ? 'select-error' : ''}`}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
                {privacyForm.formState.errors.profileVisibility && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {privacyForm.formState.errors.profileVisibility.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Activity Status</span>
                </label>
                <select
                  {...privacyForm.register('activityStatus')}
                  className={`select select-bordered ${privacyForm.formState.errors.activityStatus ? 'select-error' : ''}`}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="away">Away</option>
                </select>
                {privacyForm.formState.errors.activityStatus && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {privacyForm.formState.errors.activityStatus.message}
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2">
                    <FaChartLine />
                    Data Collection
                  </span>
                  <input
                    type="checkbox"
                    {...privacyForm.register('dataCollection')}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text flex items-center gap-2">
                    <FaUserFriends />
                    Third-Party Access
                  </span>
                  <input
                    type="checkbox"
                    {...privacyForm.register('thirdPartyAccess')}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isSubmitting.privacy}
              >
                {isSubmitting.privacy ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Privacy Settings
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 