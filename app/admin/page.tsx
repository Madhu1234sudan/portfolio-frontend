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
import { Research } from "../../src/types/research";
import ResearchTable from "../../src/components/admin/ResearchTable";
import AddResearchForm from "../../src/components/admin/AddResearchForm";

interface DecodedToken {
  exp: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [research, setResearch] =useState<Research[]>([]);

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
    const response = await api.get(
      "/projects"
    );

    setProjects(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchResearch = async () => {
  try {
    const response = await api.get(
      "/research"
    );

    setResearch(response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchProjects();
fetchResearch();
    } catch {
      sessionStorage.removeItem("adminToken");

      router.push("/admin/login");
    }
  }, [router]);
  const featuredProjects =
  projects.filter(
    (project) => project.featured
  );

const regularProjects =
  projects.filter(
    (project) => !project.featured
  );

const featuredRatio =
  projects.length > 0
    ? Math.round(
        (featuredProjects.length /
          projects.length) *
          100
      )
    : 0;

const techCounts: Record<
  string,
  number
> = {};

projects.forEach((project) => {
  project.techStack.forEach((tech) => {
    techCounts[tech] =
      (techCounts[tech] || 0) + 1;
  });
});

const mostUsedTech =
  Object.keys(techCounts).length > 0
    ? Object.entries(techCounts)
        .sort((a, b) => b[1] - a[1])[0][0]
    : "None";
  const latestProject =
    projects.length > 0 ? projects[0] : null;
    
  return (
    <main className="
flex
min-h-screen
bg-zinc-100
dark:bg-zinc-950
transition-colors
">
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
              <div
  className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
"
>
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                  Dashboard Overview
                </h2>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setActiveSection("AddProject")}
                    className="bg-green-500 hover:bg-green-400 transition-all px-5 py-3 rounded-xl text-black font-semibold"
                  >
                    + Add New Project
                  </button>

                  <button
                    onClick={() => setActiveSection("Projects")}
                    className="
bg-blue-500
hover:bg-blue-400
hover:scale-105
transition-all
px-5
py-3
rounded-xl
text-white
font-semibold
shadow-lg
shadow-blue-500/20
"
                  >
                    View Projects
                  </button>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mt-4">
                  Welcome to your AI Portfolio Admin Dashboard.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div
  className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
hover:-translate-y-1
hover:shadow-xl
hover:shadow-green-500/10
hover:border-green-400
transition-all
duration-300
cursor-pointer
"
>
                  <h3 className="text-zinc-400 text-sm">Total Projects</h3>

                  <p className="text-4xl font-bold text-black dark:text-white mt-3">
                    {projects.length}
                  </p>
                </div>

                <div
  className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
hover:-translate-y-1
hover:shadow-xl
hover:shadow-green-500/10
hover:border-green-400
transition-all
duration-300
cursor-pointer
"
>
                  <h3 className="text-zinc-400 text-sm">Featured Projects</h3>

                  <p className="text-4xl font-bold text-black dark:text-white mt-3">
                    {projects.filter((project) => project.featured).length}
                  </p>
                </div>

                <div
  className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
hover:-translate-y-1
hover:shadow-xl
hover:shadow-green-500/10
hover:border-green-400
transition-all
duration-300
cursor-pointer
"
>
                  <h3 className="text-zinc-400 text-sm">Admin Status</h3>

                  <p className="text-2xl font-bold text-green-400 mt-3">
                    Online
                  </p>
                </div>

                <div
  className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
hover:-translate-y-1
hover:shadow-xl
hover:shadow-green-500/10
hover:border-green-400
transition-all
duration-300
cursor-pointer
"
>
                  <h3 className="text-zinc-400 text-sm">Portfolio Status</h3>

                  <p className="text-2xl font-bold text-green-400 mt-3">
                    Active
                  </p>
                </div>
                <div
  className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
hover:-translate-y-1
hover:shadow-xl
hover:shadow-green-500/10
hover:border-green-400
transition-all
duration-300
cursor-pointer
"
>
                  <h3 className="text-zinc-400 text-sm">
                    Last Created Project
                  </h3>

                  <p className="text-xl font-bold text-black dark:text-white mt-3">
                    {latestProject ? latestProject.title : "None"}
                  </p>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-black dark:text-white">
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
                        className="
flex items-center justify-between
bg-zinc-50
dark:bg-zinc-950
border
border-zinc-200
dark:border-zinc-800
rounded-2xl
p-5
hover:border-green-400
hover:shadow-lg
hover:shadow-green-500/10
cursor-pointer
transition-all
duration-300
"
                      >
                        <div>
                          <h4 className="text-black dark:text-white font-semibold text-lg">
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

          {activeSection === "AddProject" && (
  <AddProjectForm
    setProjects={setProjects}
  />
)}

{activeSection === "Projects" && (
  <ProjectTable
    projects={projects}
    setProjects={setProjects}
  />
)}

          {activeSection === "AI Research" && (
  <div className="space-y-8">
    <AddResearchForm
      setResearch={setResearch}
    />

    <ResearchTable
      research={research}
      setResearch={setResearch}
    />
  </div>
)}
            <div className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                AI Research
              </h2>

              
            </div>


          {activeSection === "Analytics" && (
            <div className="space-y-8">
              <div className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
">
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                  Analytics Dashboard
                </h2>

                <p className="text-zinc-400">Real-time portfolio statistics.</p>
              </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Total Projects */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Total Projects
    </h3>

    <p className="text-4xl font-bold text-black dark:text-white mt-3">
      {projects.length}
    </p>
  </div>

  {/* Featured */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Featured Projects
    </h3>

    <p className="text-4xl font-bold text-green-500 mt-3">
      {featuredProjects.length}
    </p>
  </div>

  {/* Regular */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Regular Projects
    </h3>

    <p className="text-4xl font-bold text-black dark:text-white mt-3">
      {regularProjects.length}
    </p>
  </div>

  {/* Most Used Tech */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Most Used Technology
    </h3>

    <p className="text-2xl font-bold text-blue-500 mt-3">
      {mostUsedTech}
    </p>
  </div>

  {/* Featured Ratio */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Featured Ratio
    </h3>

    <p className="text-4xl font-bold text-purple-500 mt-3">
      {featuredRatio}%
    </p>
  </div>

  {/* Last Project */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Last Created Project
    </h3>

    <p className="text-xl font-bold text-black dark:text-white mt-3">
      {latestProject
        ? latestProject.title
        : "None"}
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
