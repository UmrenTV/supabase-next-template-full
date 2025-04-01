'use client'

import { DashboardLayout } from '@/components/organisms/dashboard-layout/dashboard-layout'
import { StatsCard } from '@/components/molecules/stats-card/stats-card'
import { Chart } from '@/components/molecules/chart/chart'

export default function AnalyticsPage() {
  // Sample data for charts
  const pageViewsData = [
    { date: '2024-01', views: 1200 },
    { date: '2024-02', views: 1500 },
    { date: '2024-03', views: 1800 },
    { date: '2024-04', views: 2100 },
    { date: '2024-05', views: 2400 },
    { date: '2024-06', views: 2700 },
  ]

  const bounceRateData = [
    { date: '2024-01', rate: 45 },
    { date: '2024-02', rate: 42 },
    { date: '2024-03', rate: 40 },
    { date: '2024-04', rate: 38 },
    { date: '2024-05', rate: 35 },
    { date: '2024-06', rate: 32 },
  ]

  const userEngagementData = [
    { date: '2024-01', engagement: 65 },
    { date: '2024-02', engagement: 68 },
    { date: '2024-03', engagement: 72 },
    { date: '2024-04', engagement: 75 },
    { date: '2024-05', engagement: 78 },
    { date: '2024-06', engagement: 82 },
  ]

  return (
    <DashboardLayout title="Analytics">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Page Views"
          value="12,345"
          change="15%"
          trend="up"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <StatsCard
          title="Bounce Rate"
          value="32%"
          change="5%"
          trend="down"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatsCard
          title="Avg. Session Duration"
          value="4m 32s"
          change="12%"
          trend="up"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatsCard
          title="User Engagement"
          value="82%"
          change="8%"
          trend="up"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          data={pageViewsData}
          xKey="date"
          yKey="views"
          title="Page Views Over Time"
        />
        <Chart
          data={bounceRateData}
          xKey="date"
          yKey="rate"
          title="Bounce Rate Trend"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Chart
          data={userEngagementData}
          xKey="date"
          yKey="engagement"
          title="User Engagement Rate"
        />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Top Pages</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Views</th>
                    <th>Bounce Rate</th>
                    <th>Avg. Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>/home</td>
                    <td>3,456</td>
                    <td>28%</td>
                    <td>5m 23s</td>
                  </tr>
                  <tr>
                    <td>/products</td>
                    <td>2,789</td>
                    <td>35%</td>
                    <td>4m 12s</td>
                  </tr>
                  <tr>
                    <td>/about</td>
                    <td>1,234</td>
                    <td>42%</td>
                    <td>3m 45s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 