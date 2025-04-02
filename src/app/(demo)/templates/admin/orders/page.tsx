"use client";

import { useState } from "react";
import { FaShoppingCart, FaSearch, FaFilter, FaDownload } from "react-icons/fa";

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2024-03-15",
      status: "Completed",
      total: "$299.99",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2024-03-14",
      status: "Processing",
      total: "$199.99",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      date: "2024-03-13",
      status: "Pending",
      total: "$499.99",
      items: 5,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="select select-bordered">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
              <button className="btn btn-outline">
                <FaFilter className="mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td>{order.total}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          order.status === "Completed"
                            ? "badge-success"
                            : order.status === "Processing"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-ghost">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
