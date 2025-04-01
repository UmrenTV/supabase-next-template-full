'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/organisms/admin-layout/admin-layout'
import { Chart } from '@/components/molecules/chart/chart'
import { 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'

const stats = [
  {
    name: 'Total Users',
    value: '2,543',
    change: '+12.5%',
    trend: 'up',
    icon: FaUsers,
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: FaShoppingCart,
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '-3.1%',
    trend: 'down',
    icon: FaDollarSign,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '+2.4%',
    trend: 'up',
    icon: FaChartLine,
  },
]

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
]

const userData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-base-100 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">{stat.name}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.trend === 'up' ? 'bg-success/20' : 'bg-error/20'
              }`}>
                <stat.icon className={`text-xl ${
                  stat.trend === 'up' ? 'text-success' : 'text-error'
                }`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.trend === 'up' ? (
                <FaArrowUp className="text-success mr-1" />
              ) : (
                <FaArrowDown className="text-error mr-1" />
              )}
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-base-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="select select-sm bg-base-200"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <Chart
            data={revenueData}
            type="line"
            height={300}
            color="#3b82f6"
            strokeWidth={2}
          />
        </div>

        {/* User Activity Chart */}
        <div className="bg-base-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">User Activity</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="select select-sm bg-base-200"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <Chart
            data={userData}
            type="bar"
            height={300}
            color="#10b981"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-base-100 rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 hover:bg-base-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <FaUsers className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">John Doe</span> created a new order
                    </p>
                    <p className="text-xs text-base-content/70">2 minutes ago</p>
                  </div>
                  <button className="btn btn-ghost btn-sm">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 