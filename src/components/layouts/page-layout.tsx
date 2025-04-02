interface PageLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  sidebar?: React.ReactNode
  className?: string
  sidebarOpen?: boolean
}

export function PageLayout({ children, header, sidebar, className = '', sidebarOpen = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Sidebar */}
      {sidebar}

      {/* Main Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-200 ease-in-out ${
        sidebar && sidebarOpen ? 'lg:ml-64' : ''
      }`}>
        {/* Header */}
        {header && (
          <div className="w-full px-6 py-4 bg-base-100 border-b border-base-200">
            {header}
          </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 container mx-auto px-6 py-8 max-w-7xl ${className}`}>
          {children}
        </main>
      </div>
    </div>
  )
} 