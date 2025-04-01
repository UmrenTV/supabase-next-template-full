'use client'

import { DashboardLayout } from '@/components/organisms/dashboard-layout/dashboard-layout'
import { StatsCard } from '@/components/molecules/stats-card/stats-card'
import { Chart } from '@/components/molecules/chart/chart'

export default function DashboardPage() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ]

  const userActivityData = [
    { day: 'Mon', users: 400 },
    { day: 'Tue', users: 300 },
    { day: 'Wed', users: 500 },
    { day: 'Thu', users: 450 },
    { day: 'Fri', users: 600 },
    { day: 'Sat', users: 550 },
    { day: 'Sun', users: 400 },
  ]

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value="1,234"
          change="12%"
          trend="up"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Revenue"
          value="$12,345"
          change="8%"
          trend="up"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="Active Projects"
          value="45"
          change="5%"
          trend="down"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          }
        />
        <StatsCard
          title="Conversion Rate"
          value="2.4%"
          change="1.2%"
          trend="up"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={revenueData}
          xKey="month"
          yKey="revenue"
          title="Revenue Overview"
        />
        <Chart
          data={userActivityData}
          xKey="day"
          yKey="users"
          title="User Activity"
        />
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h3 className="card-title">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>Created new project</td>
                  <td>2 minutes ago</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>Updated profile</td>
                  <td>5 minutes ago</td>
                  <td><span className="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td>Mike Johnson</td>
                  <td>Deleted comment</td>
                  <td>10 minutes ago</td>
                  <td><span className="badge badge-error">Failed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 