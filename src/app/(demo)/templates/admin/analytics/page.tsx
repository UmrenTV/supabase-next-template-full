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
  FaArrowDown,
  FaDesktop,
  FaMobile,
  FaTabletAlt,
  FaGlobe
} from 'react-icons/fa'

const stats = [
  {
    name: 'Total Visitors',
    value: '45,678',
    change: '+12.5%',
    trend: 'up',
    icon: FaUsers,
  },
  {
    name: 'Page Views',
    value: '234,567',
    change: '+8.2%',
    trend: 'up',
    icon: FaChartLine,
  },
  {
    name: 'Bounce Rate',
    value: '32.1%',
    change: '-3.1%',
    trend: 'up',
    icon: FaShoppingCart,
  },
  {
    name: 'Avg. Session Duration',
    value: '4m 32s',
    change: '+2.4%',
    trend: 'up',
    icon: FaDollarSign,
  },
]

const trafficData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
]

const deviceData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 25 },
  { name: 'Tablet', value: 10 },
]

const locationData = [
  { name: 'United States', value: 45 },
  { name: 'United Kingdom', value: 20 },
  { name: 'Canada', value: 15 },
  { name: 'Australia', value: 10 },
  { name: 'Others', value: 10 },
]

const deviceIcons = {
  Desktop: FaDesktop,
  Mobile: FaMobile,
  Tablet: FaTabletAlt,
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <AdminLayout title="Analytics">
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

      {/* Traffic Chart */}
      <div className="bg-base-100 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Traffic Overview</h2>
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
          data={trafficData}
          type="line"
          height={300}
          color="#3b82f6"
          strokeWidth={2}
        />
      </div>

      {/* Device and Location Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Usage */}
        <div className="bg-base-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Device Usage</h2>
            <FaGlobe className="text-xl text-base-content/70" />
          </div>
          <div className="space-y-4">
            {deviceData.map((device) => {
              const Icon = deviceIcons[device.name as keyof typeof deviceIcons]
              return (
                <div key={device.name} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Icon className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{device.name}</span>
                      <span>{device.value}%</span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${device.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-base-100 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Location Distribution</h2>
            <FaGlobe className="text-xl text-base-content/70" />
          </div>
          <div className="space-y-4">
            {locationData.map((location) => (
              <div key={location.name} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <FaGlobe className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{location.name}</span>
                    <span>{location.value}%</span>
                  </div>
                  <div className="w-full bg-base-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${location.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 