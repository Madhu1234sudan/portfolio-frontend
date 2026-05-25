"use client";

import { useEffect, useState } from "react";

import api from "../../lib/api";
import { Project } from "../../types/project";

export default function ProjectTable() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  useEffect(() => {
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
  }, []);



  const handleDelete = async (
    id: number
  ) => {
     const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this project?"
    );

  if (!confirmDelete) {
    return;
  }
    try {
      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      await api.delete(
        `/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project.id !== id
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-black">

            <tr>
              <th className="text-left p-5 text-gray-400">
                Project
              </th>

              <th className="text-left p-5 text-gray-400">
                Tech Stack
              </th>

              <th className="text-left p-5 text-gray-400">
                Featured
              </th>

              <th className="text-left p-5 text-gray-400">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project.id}
                className="border-t border-zinc-800"
              >

                <td className="p-5 text-white">
                  {project.title}
                </td>

                <td className="p-5 text-gray-400">
                  {project.techStack.join(", ")}
                </td>

                <td className="p-5">

                  {project.featured ? (
                    <span className="text-green-400">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      No
                    </span>
                  )}

                </td>

                <td className="p-5 flex gap-3">

                  <button className="bg-blue-500 hover:bg-blue-400 transition-all px-4 py-2 rounded-lg text-black font-medium">
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        project.id
                      )
                    }
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

    </div>
  );
}