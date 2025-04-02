'use client'

import { FaHome, FaProjectDiagram, FaCode, FaUser, FaEnvelope } from 'react-icons/fa'
import { BaseLayout } from '@/components/layouts/base-layout'

const navItems = [
  { href: '/templates/portfolio', label: 'Home', icon: <FaHome className="w-5 h-5" /> },
  { href: '/templates/portfolio/projects', label: 'Projects', icon: <FaProjectDiagram className="w-5 h-5" /> },
  { href: '/templates/portfolio/skills', label: 'Skills', icon: <FaCode className="w-5 h-5" /> },
  { href: '/templates/portfolio/about', label: 'About', icon: <FaUser className="w-5 h-5" /> },
  { href: '/templates/portfolio/contact', label: 'Contact', icon: <FaEnvelope className="w-5 h-5" /> },
]

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseLayout
      title="Portfolio"
      navItems={navItems}
    >
      {children}
    </BaseLayout>
  )
} 