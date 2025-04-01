'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/organisms/admin-layout/admin-layout'
import { 
  FaCog, 
  FaBell, 
  FaShieldAlt, 
  FaUser, 
  FaDatabase,
  FaEnvelope,
  FaLock,
  FaGlobe,
  FaSave
} from 'react-icons/fa'

type BaseField = {
  name: string
  type: string
  value: any
}

type TextField = BaseField & {
  type: 'text' | 'number' | 'password'
  placeholder: string
}

type TextAreaField = BaseField & {
  type: 'textarea'
  placeholder: string
}

type SelectField = BaseField & {
  type: 'select'
  options: string[]
}

type ToggleField = BaseField & {
  type: 'toggle'
  value: boolean
}

type Field = TextField | TextAreaField | SelectField | ToggleField

interface SettingSection {
  title: string
  icon: React.ComponentType<{ className?: string }>
  fields: Field[]
}

const settings: SettingSection[] = [
  {
    title: 'General Settings',
    icon: FaCog,
    fields: [
      {
        name: 'Site Name',
        type: 'text',
        value: 'Admin Panel',
        placeholder: 'Enter site name',
      },
      {
        name: 'Site Description',
        type: 'textarea',
        value: 'A powerful admin panel for managing your application',
        placeholder: 'Enter site description',
      },
      {
        name: 'Site URL',
        type: 'text',
        value: 'https://example.com',
        placeholder: 'Enter site URL',
      },
      {
        name: 'Time Zone',
        type: 'select',
        value: 'UTC',
        options: ['UTC', 'EST', 'PST', 'GMT'],
      },
    ],
  },
  {
    title: 'Email Settings',
    icon: FaEnvelope,
    fields: [
      {
        name: 'SMTP Host',
        type: 'text',
        value: 'smtp.example.com',
        placeholder: 'Enter SMTP host',
      },
      {
        name: 'SMTP Port',
        type: 'number',
        value: '587',
        placeholder: 'Enter SMTP port',
      },
      {
        name: 'SMTP Username',
        type: 'text',
        value: 'admin@example.com',
        placeholder: 'Enter SMTP username',
      },
      {
        name: 'SMTP Password',
        type: 'password',
        value: '********',
        placeholder: 'Enter SMTP password',
      },
    ],
  },
  {
    title: 'Security Settings',
    icon: FaShieldAlt,
    fields: [
      {
        name: 'Enable Two-Factor Authentication',
        type: 'toggle',
        value: true,
      },
      {
        name: 'Session Timeout (minutes)',
        type: 'number',
        value: '30',
        placeholder: 'Enter session timeout',
      },
      {
        name: 'Maximum Login Attempts',
        type: 'number',
        value: '5',
        placeholder: 'Enter maximum login attempts',
      },
      {
        name: 'Password Expiry (days)',
        type: 'number',
        value: '90',
        placeholder: 'Enter password expiry period',
      },
    ],
  },
  {
    title: 'Notification Settings',
    icon: FaBell,
    fields: [
      {
        name: 'Email Notifications',
        type: 'toggle',
        value: true,
      },
      {
        name: 'Push Notifications',
        type: 'toggle',
        value: true,
      },
      {
        name: 'SMS Notifications',
        type: 'toggle',
        value: false,
      },
      {
        name: 'Notification Frequency',
        type: 'select',
        value: 'realtime',
        options: ['realtime', 'hourly', 'daily', 'weekly'],
      },
    ],
  },
]

export default function SettingsPage() {
  const [formData, setFormData] = useState(
    settings.reduce((acc, section) => {
      section.fields.forEach(field => {
        acc[field.name] = field.value
      })
      return acc
    }, {} as Record<string, any>)
  )

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form data:', formData)
  }

  return (
    <AdminLayout title="Settings">
      <form onSubmit={handleSubmit} className="space-y-6">
        {settings.map((section) => (
          <div key={section.title} className="bg-base-100 rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <section.icon className="text-xl text-primary" />
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {section.fields.map((field) => (
                <div key={field.name} className="form-control">
                  <label className="label">
                    <span className="label-text">{field.name}</span>
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="textarea textarea-bordered"
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      className="select select-bordered"
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    >
                      {field.options.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'toggle' ? (
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">{field.name}</span>
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          checked={formData[field.name]}
                          onChange={(e) => handleInputChange(field.name, e.target.checked)}
                        />
                      </label>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      className="input input-bordered"
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            <FaSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </AdminLayout>
  )
} 