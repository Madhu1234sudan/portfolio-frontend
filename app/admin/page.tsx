"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

import AdminSidebar from "../../src/components/admin/AdminSidebar";
import AdminHeader from "../../src/components/admin/AdminHeader";
import ProjectTable from "../../src/components/admin/ProjectTable";
import AddProjectForm from "../../src/components/admin/AddProjectForm";
import api from "../../src/lib/api";
import { Project } from "../../src/types/project";

interface DecodedToken {
  exp: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = 
          useState(true);
  const [
  activeSection,
  setActiveSection,
] = useState("Dashboard");
const [projects, setProjects] =
  useState<Project[]>([]);

  useEffect(() => {
    const token =
      sessionStorage.getItem("adminToken");

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
        sessionStorage.removeItem(
          "adminToken"
        );

        router.push("/admin/login");
      }
      const fetchProjects = async () => {
  try {
    const response =
      await api.get("/projects");

    setProjects(response.data);

  } catch (error) {
    console.error(error);
  }
};

fetchProjects();

    } catch{
      sessionStorage.removeItem(
        "adminToken"
      );

      router.push("/admin/login");
    }

  }, [router]);

  return (
    <main className="flex bg-zinc-950 min-h-screen">

      <AdminSidebar
  sidebarOpen={sidebarOpen}
  activeSection={activeSection}
  setActiveSection={setActiveSection}
/>

      <div className="flex-1">

        <AdminHeader sidebarOpen={sidebarOpen}
                     setSidebarOpen={setSidebarOpen} />

        <div className="p-8 space-y-8">

 {activeSection === "Dashboard" && (
  <div className="space-y-8">

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        Dashboard Overview
      </h2>
      <div className="flex gap-4 mb-6">

  <button
    onClick={() =>
      setActiveSection("Projects")
    }
    className="bg-green-500 hover:bg-green-400 transition-all px-5 py-3 rounded-xl text-black font-semibold"
  >
    + Add New Project
  </button>

  <button
    onClick={() =>
      setActiveSection("Projects")
    }
    className="bg-zinc-800 hover:bg-zinc-700 transition-all px-5 py-3 rounded-xl text-white font-semibold border border-zinc-700"
  >
    View Projects
  </button>

</div>
      <p className="text-zinc-400">
        Welcome to your AI Portfolio Admin Dashboard.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-zinc-400 text-sm">
          Total Projects
        </h3>

        <p className="text-4xl font-bold text-white mt-3">
          {projects.length}
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-zinc-400 text-sm">
          Featured Projects
        </h3>

        <p className="text-4xl font-bold text-white mt-3">
         {
  projects.filter(
    (project) => project.featured
  ).length
}
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-zinc-400 text-sm">
          Admin Status
        </h3>

        <p className="text-2xl font-bold text-green-400 mt-3">
          Online
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-zinc-400 text-sm">
          Portfolio Status
        </h3>

        <p className="text-2xl font-bold text-green-400 mt-3">
          Active
        </p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

  <h3 className="text-2xl font-bold text-white mb-6">
    Recent Projects
  </h3>

  <div className="space-y-4">

    {projects.slice(0, 5).map((project) => (
      <div
        key={project.id}
        className="border-b border-zinc-800 pb-4"
      >
        <p className="text-white font-medium">
          {project.title}
        </p>

        <p className="text-zinc-400 text-sm">
          {project.techStack.join(", ")}
        </p>
      </div>
    ))}

  </div>

</div>

    </div>

  </div>
)}

  {activeSection === "Projects" && (
    <>
      <AddProjectForm />
      <ProjectTable />
    </>
  )}

  {activeSection === "AI Research" && (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        AI Research
      </h2>

      <p className="text-zinc-400">
        Research management module coming soon.
      </p>
    </div>
  )}

  {activeSection === "Analytics" && (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        Analytics
      </h2>

      <p className="text-zinc-400">
        Analytics dashboard coming soon.
      </p>
    </div>
  )}

</div>

      </div>

    </main>
  );
}