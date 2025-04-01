import { checkRole } from '@/lib/auth/rbac'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Next.js Template',
  description: 'Admin dashboard for managing users and content'
}

export default async function AdminPage() {
  await checkRole('admin')

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Management Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Management</h2>
            <p>Manage user accounts and permissions</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View Users</button>
            </div>
          </div>
        </div>

        {/* Content Management Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Content Management</h2>
            <p>Manage blog posts and product listings</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Manage Content</button>
            </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Analytics</h2>
            <p>View site statistics and user activity</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View Analytics</button>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Site Settings</h2>
            <p>Configure site-wide settings and preferences</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Manage Settings</button>
            </div>
          </div>
        </div>

        {/* Audit Logs Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Audit Logs</h2>
            <p>Review system activity and changes</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View Logs</button>
            </div>
          </div>
        </div>

        {/* System Health Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">System Health</h2>
            <p>Monitor system performance and errors</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Check Status</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 