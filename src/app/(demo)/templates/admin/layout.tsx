"use client";

import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { getPlaceholderImage } from "@/constants/placeholders";
import { BaseLayout } from "@/components/layouts/base-layout";
import { HeaderContent } from "@/components/molecules/header/header-content";
import { AuthProvider } from "@/lib/auth/auth-context";

const navItems = [
  {
    href: "/templates/admin",
    label: "Dashboard",
    icon: <FaHome className="w-5 h-5" />,
  },
  {
    href: "/templates/admin/users",
    label: "Users",
    icon: <FaUsers className="w-5 h-5" />,
  },
  {
    href: "/templates/admin/orders",
    label: "Orders",
    icon: <FaShoppingCart className="w-5 h-5" />,
  },
  {
    href: "/templates/admin/analytics",
    label: "Analytics",
    icon: <FaChartBar className="w-5 h-5" />,
  },
  {
    href: "/templates/admin/settings",
    label: "Settings",
    icon: <FaCog className="w-5 h-5" />,
  },
];

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  initials: "JD",
  avatar: getPlaceholderImage("AVATAR_MALE", 40, 40, "JD"),
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <BaseLayout
        title="Admin"
        navItems={navItems}
        headerContent={<HeaderContent user={mockUser} />}
      >
        {children}
      </BaseLayout>
    </AuthProvider>
  );
}
