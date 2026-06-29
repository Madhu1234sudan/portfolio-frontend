"use client";

import { useEffect } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useProjects from "@/src/hooks/admin/useProjects";

// using the section here

import DashboardContent from "@/src/admin/dashboard/components/DashboardContent";

import AdminGuard from "@/src/components/auth/AdminGuard";
export default function DashboardController() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { projects, setProjects, refreshProjects } = useProjects();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshProjects();
        const [] = await Promise.all([]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refreshProjects]);

  return (
    <AdminGuard>
      <main className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}

        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} />}

        <div className="flex-1">
          <div className="p-8 space-y-8">
            {pathname === "/admin/dashboard" && (
              <DashboardContent
                projects={projects}
                onAddProject={() => router.push("/admin/dashboard/projects")}
                onViewProjects={() => router.push("/admin/dashboard/projects")}
              />
            )}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
