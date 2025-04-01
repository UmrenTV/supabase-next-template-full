'use client'

import { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'
import { Toaster } from 'react-hot-toast'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-base-200">
      <Toaster position="top-right" />
      <div className="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-100 border-b z-20">
            <div className="flex-none lg:hidden">
              <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">{title}</div>
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-base-200 p-6">
            {children}
          </main>
        </div>
        {/* Sidebar */}
        <div className="drawer-side z-30">
          <label htmlFor="main-drawer" className="drawer-overlay"></label>
          <aside className="bg-base-100 w-80 min-h-screen">
            {/* Sidebar content */}
            <div className="p-4">
              <h2 className="text-2xl font-bold">Dashboard</h2>
            </div>
            <ul className="menu p-4">
              <li><a href="/dashboard" className="active">Overview</a></li>
              <li><a href="/dashboard/analytics">Analytics</a></li>
              <li><a href="/dashboard/settings">Settings</a></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
} 