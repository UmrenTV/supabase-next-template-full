"use client";

import { useState } from "react";
import { PageLayout } from "./page-layout";
import { Sidebar } from "@/components/organisms/sidebar/sidebar";

interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
  navItems?: Array<{
    href: string;
    label: string;
    icon: React.ReactNode;
  }>;
  headerContent?: React.ReactNode;
}

export function BaseLayout({
  children,
  title,
  navItems,
  headerContent,
}: BaseLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <PageLayout
      sidebar={
        navItems && (
          <Sidebar
            title={title}
            navItems={navItems}
            isOpen={isSidebarOpen}
            onToggle={handleSidebarToggle}
          />
        )
      }
      header={headerContent}
      sidebarOpen={isSidebarOpen}
    >
      {children}
    </PageLayout>
  );
}
