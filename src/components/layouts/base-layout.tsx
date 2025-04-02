'use client'

import { PageLayout } from './page-layout'
import { Sidebar } from '@/components/organisms/sidebar/sidebar'

interface BaseLayoutProps {
  children: React.ReactNode
  title: string
  navItems?: Array<{
    href: string
    label: string
    icon: React.ReactNode
  }>
  headerContent?: React.ReactNode
}

export function BaseLayout({ children, title, navItems, headerContent }: BaseLayoutProps) {
  return (
    <PageLayout
      sidebar={navItems && <Sidebar title={title} navItems={navItems} />}
      header={headerContent}
    >
      {children}
    </PageLayout>
  )
} 