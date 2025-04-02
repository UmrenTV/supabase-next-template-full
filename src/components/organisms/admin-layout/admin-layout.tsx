'use client'

import { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'
import { Header } from '../header/header'
import { PageLayout } from '@/components/layouts/page-layout'
import { Toaster } from 'react-hot-toast'
import { 
  FaHome, 
  FaUsers, 
  FaShoppingCart, 
  FaCog
} from 'react-icons/fa'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

const navigation = [
  { label: 'Overview', href: '/admin', icon: <FaHome /> },
  { label: 'Users', href: '/admin/users', icon: <FaUsers /> },
  { label: 'Orders', href: '/admin/orders', icon: <FaShoppingCart /> },
  { label: 'Settings', href: '/admin/settings', icon: <FaCog /> },
]

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  initials: 'JD'
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Toaster position="top-right" />
      <PageLayout
        sidebar={
          <Sidebar 
            title="Admin"
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