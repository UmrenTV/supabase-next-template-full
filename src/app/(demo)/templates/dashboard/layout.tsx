'use client'

import { FaHome, FaChartBar, FaUsers, FaCog } from 'react-icons/fa'
import { getPlaceholderImage } from '@/constants/placeholders'
import { BaseLayout } from '@/components/layouts/base-layout'
import { HeaderContent } from '@/components/molecules/header/header-content'
import { AuthProvider } from '@/lib/auth/auth-context'

const navItems = [
  { href: '/templates/dashboard', label: 'Dashboard', icon: <FaHome className="w-5 h-5" /> },
  { href: '/templates/dashboard/analytics', label: 'Analytics', icon: <FaChartBar className="w-5 h-5" /> },
  { href: '/templates/dashboard/users', label: 'Users', icon: <FaUsers className="w-5 h-5" /> },
  { href: '/templates/dashboard/settings', label: 'Settings', icon: <FaCog className="w-5 h-5" /> },
]

const mockUser = {
  name: 'John Doe',
  initials: 'JD',
  avatar: getPlaceholderImage('AVATAR_MALE', 40, 40, 'JD')
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <BaseLayout
        title="Dashboard"
        navItems={navItems}
        headerContent={<HeaderContent user={mockUser} />}
      >
        {children}
      </BaseLayout>
    </AuthProvider>
  )
} 