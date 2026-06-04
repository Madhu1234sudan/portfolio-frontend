"use client";

import { useState } from "react";
import EditProjectModal from "./EditProjectModal";

import api from "../../lib/api";
import { Project } from "../../types/project";

interface ProjectTableProps {
  projects: Project[];

  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function ProjectTable({
  projects,
  setProjects,
}: ProjectTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) {
      return;
    }
    try {
      const token = sessionStorage.getItem("adminToken");
      console.log(token);
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="mb-6">
          <div className="relative w-96">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
      w-full
      bg-white
      dark:bg-zinc-900
      border
      border-zinc-300
      dark:border-zinc-700
      rounded-xl
      pl-12
      pr-4
      py-3
      text-black
      dark:text-white
      placeholder:text-zinc-500
      focus:outline-none
      focus:border-green-400
      transition-all
    "
            />
          </div>
        </div>
      </div>
      <div
        className="
  bg-white
  dark:bg-zinc-900
  border
  border-zinc-300
  dark:border-zinc-800
  rounded-2xl
  overflow-hidden
  shadow-sm
"
      >
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-black">
            <tr>
              <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                Project
              </th>

              <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                Tech Stack
              </th>

              <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                Featured
              </th>

              <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr
                key={project.id}
                className="
  border-t
  border-zinc-300
  dark:border-zinc-800
  hover:bg-zinc-50
  dark:hover:bg-zinc-800/30
  transition-all
"
              >
                <td className="p-5 text-black dark:text-white font-medium">{project.title}</td>

                <td className="p-5 text-zinc-600 dark:text-zinc-400">
                  {project.techStack.join(", ")}
                </td>

                <td className="p-5">
                  {project.featured ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>

                <td className="p-5 flex gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="
px-4
py-2
rounded-xl
bg-blue-500/10
text-blue-500
border
border-blue-500/20
hover:bg-blue-500/20
transition-all
"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="
px-4
py-2
rounded-xl
bg-red-500/10
text-red-500
border
border-red-500/20
hover:bg-red-500/20
transition-all
"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={(updatedProject) =>
            setProjects((prev) =>
              prev.map((project) =>
                project.id === updatedProject.id ? updatedProject : project,
              ),
            )
          }
        />
      )}
    </div>
  );
}
