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
  FaCog 
} from 'react-icons/fa'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(200, 'Bio must be less than 200 characters'),
})

const securitySchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
})

const privacySchema = z.object({
  profileVisibility: z.enum(['public', 'private', 'friends']),
  activityStatus: z.enum(['online', 'away', 'offline']),
  dataCollection: z.boolean(),
  thirdPartyAccess: z.boolean(),
})

type ProfileFormData = z.infer<typeof profileSchema>
type SecurityFormData = z.infer<typeof securitySchema>
type NotificationFormData = z.infer<typeof notificationSchema>
type PrivacyFormData = z.infer<typeof privacySchema>

export default function SettingsPage() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Software Developer',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    profileVisibility: 'public',
    activityStatus: 'online',
    dataCollection: true,
    thirdPartyAccess: false
  })

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      bio: formData.bio,
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
      emailNotifications: formData.emailNotifications,
      pushNotifications: formData.pushNotifications,
      smsNotifications: formData.smsNotifications,
      marketingEmails: formData.marketingEmails,
    }
  })

  const privacyForm = useForm<PrivacyFormData>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: formData.profileVisibility as 'public' | 'private' | 'friends',
      activityStatus: formData.activityStatus as 'online' | 'away' | 'offline',
      dataCollection: formData.dataCollection,
      thirdPartyAccess: formData.thirdPartyAccess,
    }
  })

  const handlePhotoChange = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfilePhoto(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const onProfileSubmit = (data: ProfileFormData) => {
    setFormData(prev => ({ ...prev, ...data }))
    // Handle API call here
    console.log('Profile updated:', data)
  }

  const onSecuritySubmit = (data: SecurityFormData) => {
    // Handle API call here
    console.log('Security updated:', data)
    securityForm.reset()
  }

  const onNotificationSubmit = (data: NotificationFormData) => {
    setFormData(prev => ({ ...prev, ...data }))
    // Handle API call here
    console.log('Notifications updated:', data)
  }

  const onPrivacySubmit = (data: PrivacyFormData) => {
    setFormData(prev => ({ ...prev, ...data }))
    // Handle API call here
    console.log('Privacy updated:', data)
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
                  name={formData.fullName}
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
                disabled={profileForm.formState.isSubmitting}
              >
                <FaSave className="mr-2" />
                {profileForm.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
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
                disabled={securityForm.formState.isSubmitting}
              >
                <FaSave className="mr-2" />
                {securityForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
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
                disabled={notificationForm.formState.isSubmitting}
              >
                <FaSave className="mr-2" />
                {notificationForm.formState.isSubmitting ? 'Saving...' : 'Save Preferences'}
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
                  <option value="away">Away</option>
                  <option value="offline">Offline</option>
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
                disabled={privacyForm.formState.isSubmitting}
              >
                <FaSave className="mr-2" />
                {privacyForm.formState.isSubmitting ? 'Saving...' : 'Save Privacy Settings'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 