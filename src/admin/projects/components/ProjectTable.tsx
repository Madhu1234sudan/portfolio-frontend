"use client";

import { useState } from "react";
import EditProjectModal from "@/src/admin/projects/modals/EditProjectModal";
import ConfirmationDialog from "@/src/dialogs/ConfirmationDialog";

import api from "@/src/lib/api";
import { Project } from "@/src/types/project";
import SearchBar from "@/src/common/SearchBar";
import AdminCard from "@/src/common/AdminCard";
import AdminTable from "@/src/table/AdminTable";
import EmptyState from "@/src/common/EmptyState";
import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { DangerButton } from "@/src/buttons/DangerButton";
import { StatusBadge } from "@/src/common/StatusBadge";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";
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
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const confirmDelete = async (id: number) => {
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
        <AdminCard className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search projects..."
            className="max-w-md"
          />
        </AdminCard>
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
                Image
              </th>
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
                <td className="p-5">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="
      h-16
      w-16
      object-cover
      rounded-xl
      border
      border-zinc-300
      dark:border-zinc-700
      "
                    />
                  ) : (
                    <div
                      className="
      h-16
      w-16
      rounded-xl
      bg-zinc-200
      dark:bg-zinc-800
      flex
      items-center
      justify-center
      text-xs
      text-zinc-500
      "
                    >
                      No Img
                    </div>
                  )}
                </td>
                <td className="p-5 text-black dark:text-white font-medium">
                  {project.title}
                </td>

                <td className="p-5 text-zinc-600 dark:text-zinc-400">
                  {project.techStack.join(", ")}
                </td>

                <td className="p-5">
                  {project.featured ? (
                    <StatusBadge variant="success">Featured</StatusBadge>
                  ) : (
                    <StatusBadge>Regular</StatusBadge>
                  )}
                </td>

                <td className="p-5 flex gap-3">
                  <SecondaryButton onClick={() => setSelectedProject(project)}>
                    Edit
                  </SecondaryButton>

                  <DangerButton onClick={() => setDeleteProjectId(project.id)}>
                    Delete
                  </DangerButton>
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
      <ConfirmationDialog
        open={deleteProjectId !== null}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        loading={isDeleting}
        onCancel={() => setDeleteProjectId(null)}
        onConfirm={async () => {
          if (deleteProjectId === null) return;

          setIsDeleting(true);

          try {
            await confirmDelete(deleteProjectId);
            setDeleteProjectId(null);
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </div>
  );
}
