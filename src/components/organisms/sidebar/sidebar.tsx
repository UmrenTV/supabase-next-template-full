"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/lib/auth/auth-context";
import { isProtectedRoute } from "@/lib/auth/route-protection";
import { ThemeSwitcher } from "@/components/atoms/theme-switcher/theme-switcher";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  title: string;
  navItems: NavItem[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  title,
  navItems,
  isOpen = false,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const currentPath = pathname;
      await logout();

      // If we're on a protected route, redirect to login with redirectTo
      if (isProtectedRoute(currentPath)) {
        router.push(
          `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`
        );
      }
      // Otherwise, we stay on the current page and the UI will update automatically
      // due to the user state change
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleLogin = () => {
    // Add current path as redirectTo parameter
    router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If it's a hash link, handle smooth scrolling
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const commonLinkClasses = `
    flex ${
      isOpen ? "justify-start" : "justify-center"
    } px-3 py-2 rounded-lg transition-all duration-300 w-full
  `;

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#1B1E23] border-r border-gray-800
          transition-all duration-300 ease-in-out z-30 flex flex-col overflow-hidden
          ${isOpen ? "w-64" : "w-16"}
        `}
      >
        {/* Sidebar Header with Toggle Button */}
        <div
          className={`h-16 flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          } px-4 border-b border-gray-800`}
        >
          <h1
            className={`
              text-xl font-semibold transition-all duration-300 delay-100
              ${isOpen ? "opacity-100 flex-1" : "opacity-0 w-0 overflow-hidden"}
            `}
          >
            {title}
          </h1>
          <button onClick={onToggle} className="btn btn-ghost btn-circle">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`
                ${commonLinkClasses}
                ${
                  pathname === item.href
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-300"
                }
              `}
            >
              <div className="flex items-center">
                <div className="w-6 flex justify-center">{item.icon}</div>
                <span
                  className={`
                    transition-all duration-300 delay-100
                    ${
                      isOpen
                        ? "opacity-100 w-auto ml-3 "
                        : "opacity-0 w-0 overflow-hidden"
                    }
                  `}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Auth and Theme Controls */}
        <div className="p-4 border-t border-gray-800">
          {user ? (
            <button
              onClick={handleLogout}
              className={`
                ${commonLinkClasses}
                hover:bg-base-300 hover:cursor-pointer text-error
              `}
            >
              <div className="flex items-center">
                <div className="w-6 flex justify-center">
                  <FaSignOutAlt />
                </div>
                <span
                  className={`
                    transition-all duration-300 delay-100
                    ${
                      isOpen
                        ? "opacity-100 w-auto ml-3"
                        : "opacity-0 w-0 overflow-hidden"
                    }
                  `}
                >
                  Logout
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className={`
                ${commonLinkClasses}
                hover:bg-base-300 hover:cursor-pointer
              `}
            >
              <div className="flex items-center">
                <div className="w-6 flex justify-center">
                  <FaSignInAlt />
                </div>
                <span
                  className={`
                    transition-all duration-300 delay-100
                    ${
                      isOpen
                        ? "opacity-100 w-auto ml-3"
                        : "opacity-0 w-0 overflow-hidden"
                    }
                  `}
                >
                  Login
                </span>
              </div>
            </button>
          )}

          <div className="mt-4 flex justify-center">
            <ThemeSwitcher />
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={onToggle}
        />
      )}
    </>
  );
}
