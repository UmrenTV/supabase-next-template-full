"use client";

import {
  FaHome,
  FaProjectDiagram,
  FaCode,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { BaseLayout } from "@/components/layouts/base-layout";

// Define sections for smooth scrolling
const navItems = [
  { href: "#home", label: "Home", icon: <FaHome className="w-5 h-5" /> },
  {
    href: "#projects",
    label: "Projects",
    icon: <FaProjectDiagram className="w-5 h-5" />,
  },
  { href: "#skills", label: "Skills", icon: <FaCode className="w-5 h-5" /> },
  { href: "#about", label: "About", icon: <FaUser className="w-5 h-5" /> },
  {
    href: "#contact",
    label: "Contact",
    icon: <FaEnvelope className="w-5 h-5" />,
  },
];

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout title="Portfolio" navItems={navItems}>
      {children}
    </BaseLayout>
  );
}
