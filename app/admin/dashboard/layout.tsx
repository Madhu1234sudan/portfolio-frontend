"use client";

import { useState } from "react";
import AdminSidebar from "@/src/admin/_shared/navigation/AdminSidebar";
import AdminHeader from "@/src/admin/_shared/layout/AdminHeader";
import Breadcrumbs from "@/src/admin/_shared/navigation/Breadcrumbs";
import AdminPageLayout from "@/src/admin/_shared/layout/AdminPageLayout";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
  <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors">
    {sidebarOpen && (
      <div
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 bg-black/50 z-40"
      />
    )}

    <AdminSidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    <div className="flex-1 flex flex-col">
      <AdminHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <AdminPageLayout>
        <Breadcrumbs />

        {children}
      </AdminPageLayout>
    </div>
  </div>
);
}