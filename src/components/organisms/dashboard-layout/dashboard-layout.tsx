'use client'

import { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'
import { Header } from '../header/header'
import { PageLayout } from '@/components/layouts/page-layout'
import { Toaster } from 'react-hot-toast'
import { 
  FaHome, 
  FaChartBar, 
  FaCog
} from 'react-icons/fa'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

const navigation = [
  { label: 'Overview', href: '/dashboard', icon: <FaHome /> },
  { label: 'Analytics', href: '/dashboard/analytics', icon: <FaChartBar /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <FaCog /> },
]

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  initials: 'JD'
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Toaster position="top-right" />
      <PageLayout
        sidebar={
          <Sidebar 
            title="Dashboard"
            navItems={navigation}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        }
        header={
          <Header 
            user={mockUser}
            showSearch
            showNotifications
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        }
        sidebarOpen={isSidebarOpen}
      >
        {children}
      </PageLayout>
    </>
  )
} 