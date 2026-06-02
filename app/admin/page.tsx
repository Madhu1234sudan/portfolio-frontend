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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        sessionStorage.removeItem("adminToken");

        router.push("/admin/login");
      }
      const fetchProjects = async () => {
        try {
          const response = await api.get("/projects");

          setProjects(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProjects();
    } catch {
      sessionStorage.removeItem("adminToken");

      router.push("/admin/login");
    }
  }, [router]);
  const latestProject =
    projects.length > 0 ? projects[projects.length - 1] : null;
  return (
    <main className="flex bg-zinc-950 min-h-screen">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {sidebarOpen && (
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div className="flex-1">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-8 space-y-8">
          {activeSection === "Dashboard" && (
            <div className="space-y-8">
              {/* Dashboard Hero */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Dashboard Overview
                </h2>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setActiveSection("Projects")}
                    className="bg-green-500 hover:bg-green-400 transition-all px-5 py-3 rounded-xl text-black font-semibold"
                  >
                    + Add New Project
                  </button>

                  <button
                    onClick={() => setActiveSection("Projects")}
                    className="bg-zinc-800 hover:bg-zinc-700 transition-all px-5 py-3 rounded-xl text-white font-semibold border border-zinc-700"
                  >
                    View Projects
                  </button>
                </div>

                <p className="text-zinc-400">
                  Welcome to your AI Portfolio Admin Dashboard.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Total Projects</h3>

                  <p className="text-4xl font-bold text-white mt-3">
                    {projects.length}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Featured Projects</h3>

                  <p className="text-4xl font-bold text-white mt-3">
                    {projects.filter((project) => project.featured).length}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Admin Status</h3>

                  <p className="text-2xl font-bold text-green-400 mt-3">
                    Online
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Portfolio Status</h3>

                  <p className="text-2xl font-bold text-green-400 mt-3">
                    Active
                  </p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">
                    Last Created Project
                  </h3>

                  <p className="text-xl font-bold text-white mt-3">
                    {latestProject ? latestProject.title : "None"}
                  </p>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Recent Projects
                  </h3>

                  <span className="text-zinc-400 text-sm">
                    {projects.length} Project(s)
                  </span>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-zinc-500">No projects found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div
                        key={project.id}
                        onClick={() => setActiveSection("Projects")}
                        className="flex items-center justify-between bg-black border border-zinc-800 rounded-xl p-5 hover:border-green-400 cursor-pointer transition-all"
                      >
                        <div>
                          <h4 className="text-white font-semibold text-lg">
                            {project.title}
                          </h4>

                          <p className="text-zinc-400 text-sm mt-1">
                            {project.techStack.join(", ")}
                          </p>
                        </div>

                        {project.featured ? (
                          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                            Featured
                          </span>
                        ) : (
                          <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-sm">
                            Regular
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "Projects" && (
            <>
              <AddProjectForm setProjects={setProjects} />
              <ProjectTable projects={projects} setProjects={setProjects} />
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
            <div className="space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Analytics Dashboard
                </h2>

                <p className="text-zinc-400">Real-time portfolio statistics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Total Projects</h3>

                  <p className="text-4xl font-bold text-white mt-3">
                    {projects.length}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Featured Projects</h3>

                  <p className="text-4xl font-bold text-green-400 mt-3">
                    {projects.filter((project) => project.featured).length}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Regular Projects</h3>

                  <p className="text-4xl font-bold text-white mt-3">
                    {projects.filter((project) => !project.featured).length}
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">Portfolio Status</h3>

                  <p className="text-2xl font-bold text-green-400 mt-3">
                    Active
                  </p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-zinc-400 text-sm">
                    Last Created Project
                  </h3>

                  <p className="text-xl font-bold text-white mt-3">
                    {latestProject ? latestProject.title : "None"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
