"use client";

import {
  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+12.5%",
      icon: FaDollarSign,
    },
    { title: "Active Users", value: "2,543", change: "+8.2%", icon: FaUsers },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+15.3%",
      icon: FaShoppingCart,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+2.4%",
      icon: FaChartLine,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base-content/70">{metric.title}</h3>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <metric.icon className="text-2xl text-primary" />
              </div>
              <div className="mt-2">
                <span
                  className={`text-sm ${
                    metric.change.startsWith("+")
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-sm text-base-content/70 ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue Overview</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-base-content/70">
                Revenue chart will be displayed here
              </p>
            </div>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Activity</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <p className="text-base-content/70">
                User activity chart will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
