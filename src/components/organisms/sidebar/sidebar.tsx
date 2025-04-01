import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/atoms'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface SidebarProps {
  items: NavItem[]
  className?: string
}

export function Sidebar({ items, className = '' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`drawer lg:drawer-open ${className}`}>
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-100 lg:hidden">
          <Button
            label="Menu"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-80 min-h-screen">
          <div className="p-4">
            <h2 className="text-2xl font-bold">Menu</h2>
          </div>
          <ul className="menu p-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
} 