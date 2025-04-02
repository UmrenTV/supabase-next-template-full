"use client";

import {
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: FaUsers, change: "+12%" },
    {
      title: "Total Orders",
      value: "456",
      icon: FaShoppingCart,
      change: "+8%",
    },
    { title: "Revenue", value: "$12,345", icon: FaChartLine, change: "+15%" },
    { title: "Issues", value: "3", icon: FaExclamationTriangle, change: "-2" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base-content/70">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className="text-2xl text-primary" />
              </div>
              <div className="mt-2">
                <span
                  className={`text-sm ${
                    stat.change.startsWith("+") ? "text-success" : "text-error"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-base-content/70 ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-base-200 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaUsers className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-base-content/70">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
