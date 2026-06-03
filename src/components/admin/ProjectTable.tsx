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
          <div className="relative w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search Projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
        w-full
        bg-transparent
        border-b-2
        border-zinc-700
        pl-12
        pr-4
        py-3
        text-white
        outline-none
        transition-all
        duration-300
        focus:border-green-400
      "
            />
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black">
            <tr>
              <th className="text-left p-5 text-gray-400">Project</th>

              <th className="text-left p-5 text-gray-400">Tech Stack</th>

              <th className="text-left p-5 text-gray-400">Featured</th>

              <th className="text-left p-5 text-gray-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="border-t border-zinc-800">
                <td className="p-5 text-white">{project.title}</td>

                <td className="p-5 text-gray-400">
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
                    className="bg-blue-500 hover:bg-blue-400 transition-all px-4 py-2 rounded-lg text-black font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 hover:bg-red-400 transition-all px-4 py-2 rounded-lg text-black font-medium"
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
