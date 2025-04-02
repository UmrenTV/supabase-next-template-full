"use client";

import { useState } from "react";
import {
  FaCog,
  FaBell,
  FaShieldAlt,
  FaUser,
  FaDatabase,
  FaEnvelope,
  FaLock,
  FaGlobe,
  FaSave,
} from "react-icons/fa";

type BaseField = {
  name: string;
  type: string;
  value: any;
};

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          <FaSave className="mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-xl text-primary" />
              <h2 className="card-title">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Display Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  defaultValue="John Doe"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  defaultValue="john@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <FaBell className="text-xl text-primary" />
              <h2 className="card-title">Notification Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Email Notifications</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Push Notifications</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    defaultChecked
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-xl text-primary" />
              <h2 className="card-title">Security Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input type="password" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input type="password" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input type="password" className="input input-bordered" />
              </div>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-xl text-primary" />
              <h2 className="card-title">Database Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Database URL</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  defaultValue="postgresql://localhost:5432/mydb"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Backup Frequency</span>
                </label>
                <select className="select select-bordered">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
