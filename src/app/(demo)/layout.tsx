import Link from 'next/link'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              Next.js Template
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/components">Components</Link>
              </li>
              <li>
                <Link href="/templates">Templates</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        {children}
      </div>
    </div>
  )
} 