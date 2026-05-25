"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

import AdminSidebar from "../../src/components/admin/AdminSidebar";
import AdminHeader from "../../src/components/admin/AdminHeader";
import ProjectTable from "../../src/components/admin/ProjectTable";
import AddProjectForm from "../../src/components/admin/AddProjectForm";

interface DecodedToken {
  exp: number;
}

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const decoded: DecodedToken =
        jwtDecode(token);

      const currentTime =
        Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem(
          "adminToken"
        );

        router.push("/admin/login");
      }

    } catch (error) {
      localStorage.removeItem(
        "adminToken"
      );

      router.push("/admin/login");
    }

  }, [router]);

  return (
    <main className="flex bg-zinc-950 min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <div className="p-8 space-y-8">

          <AddProjectForm />

          <ProjectTable />

        </div>

      </div>

    </main>
  );
}