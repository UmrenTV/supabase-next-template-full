'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaHome, FaChartBar, FaUsers, FaCog, FaBell, FaSearch } from 'react-icons/fa'
import { getPlaceholderImage } from '@/constants/placeholders'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { href: '/templates/dashboard', label: 'Dashboard', icon: <FaHome className="w-5 h-5" /> },
  { href: '/templates/dashboard/analytics', label: 'Analytics', icon: <FaChartBar className="w-5 h-5" /> },
  { href: '/templates/dashboard/users', label: 'Users', icon: <FaUsers className="w-5 h-5" /> },
  { href: '/templates/dashboard/settings', label: 'Settings', icon: <FaCog className="w-5 h-5" /> },
]

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: getPlaceholderImage('AVATAR_MALE', 40, 40, 'JD')
}

const mockNotifications = [
  {
    id: 1,
    title: 'New User Registration',
    message: 'A new user has registered on the platform.',
    time: '5 min ago',
    avatar: getPlaceholderImage('AVATAR_FEMALE', 32, 32, 'NR')
  },
  {
    id: 2,
    title: 'System Update',
    message: 'System maintenance scheduled for tonight.',
    time: '1 hour ago',
    avatar: getPlaceholderImage('AVATAR_MALE', 32, 32, 'SU')
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <nav className="navbar bg-base-200 fixed top-0 left-0 right-0 z-30">
        <div className="flex-1">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex-1 px-4">
            <div className="form-control w-full max-w-xs">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-full"
                />
                <button className="btn btn-square">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <div className="indicator">
                <FaBell />
                <span className="badge badge-sm badge-primary indicator-item">
                  {mockNotifications.length}
                </span>
              </div>
            </button>
            {notificationsOpen && (
              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-80">
                {mockNotifications.map((notification) => (
                  <li key={notification.id}>
                    <a className="py-3 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full relative">
                            <Image
                              src={notification.avatar}
                              alt=""
                              fill
                              className="rounded-full"
                              sizes="32px"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-base-content/70 truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-base-content/50">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full relative">
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  fill
                  className="rounded-full"
                  sizes="40px"
                />
              </div>
            </label>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-base-200 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <Link href="/templates/dashboard" className="text-xl font-bold">
            Dashboard
          </Link>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-base-content/70 hover:bg-base-300 ${
                pathname === item.href ? 'bg-primary text-primary-content' : ''
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        {children}
      </main>
    </div>
  )
} 