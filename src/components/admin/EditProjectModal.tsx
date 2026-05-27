"use client";

import { useState } from "react";
import api  from "@/src/lib/api";

import { Project } from "../../types/project";

interface EditProjectModalProps {
  project: Project;

  onClose: () => void;

  onUpdate: (updatedProject: Project) => void;
}

export default function EditProjectModal({
  project,
  onClose,
  onUpdate,
}: EditProjectModalProps) {

  const [title, setTitle] =
    useState(project.title);

  const [description, setDescription] =
    useState(project.description);

  const [techStack, setTechStack] =
    useState(
      project.techStack.join(", ")
    );

  const [githubUrl, setGithubUrl] =
    useState(project.githubUrl || "");

  const [liveUrl, setLiveUrl] =
    useState(project.liveUrl || "");

  const [featured, setFeatured] =
    useState(project.featured);
const handleSave = async () => {
  try {
    const token =
      sessionStorage.getItem(
        "adminToken"
      );

    const response =
      await api.put(
        `/projects/${project.id}`,
        {
          title,
          description,

          techStack:
            techStack
              .split(",")
              .map((tech) =>
                tech.trim()
              ),

          githubUrl,
          liveUrl,
          featured,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    onUpdate(response.data);

    onClose();

  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">

      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-white">
            Edit Project
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        <form className="space-y-6">

          <div>

  <label className="block text-white mb-2">
  Project Title{" "}
  <span className="text-red-500">
    *
  </span>
</label>
  <input
    type="text"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
  />

</div>

          <div>

  <label className="block text-white mb-2">
  Description{" "}
  <span className="text-red-500">
    *
  </span>
</label>

  <textarea
    value={description}
    onChange={(e) =>
      setDescription(
        e.target.value
      )
    }
    className="w-full h-32 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
  />

</div>

          <div>

 <label className="block text-white mb-2">
  Tech Stack{" "}
  <span className="text-red-500">
    *
  </span>
</label>
  <input
    type="text"
    value={techStack}
    onChange={(e) =>
      setTechStack(
        e.target.value
      )
    }
    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
  />

</div>

          <input
            type="text"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <input
            type="text"
            value={liveUrl}
            onChange={(e) =>
              setLiveUrl(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white"
          />

          <label className="flex items-center gap-3 text-white">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(
                  e.target.checked
                )
              }
            />

            Featured Project

          </label>

          <div className="flex gap-4">

            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-400 transition-all px-6 py-3 rounded-xl text-black font-semibold"

            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 hover:bg-zinc-600 transition-all px-6 py-3 rounded-xl text-white font-semibold"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}