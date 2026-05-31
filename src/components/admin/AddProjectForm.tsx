"use client";

import { useState } from "react";

import api from "../../lib/api";

import { Project } from "../../types/project";

interface AddProjectFormProps {
  setProjects:
    React.Dispatch<
      React.SetStateAction<Project[]>
    >;
}

export default function AddProjectForm({
  setProjects,
}: AddProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [techStack, setTechStack] =
    useState("");

  const [githubUrl, setGithubUrl] =
    useState("");

  const [liveUrl, setLiveUrl] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !techStack.trim()
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    setError("");
    setSuccess("");

    try {
      const token =
        sessionStorage.getItem("adminToken");

      const response =
  await api.post(
    
        "/projects",
        {
          title,
          description,

          techStack: techStack
            .split(",")
            .map((tech) => tech.trim()),

          githubUrl,
          liveUrl,
          featured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects((prev) => [
  response.data,
  ...prev,
]);

setSuccess(
  "Project created successfully."
);

      setSuccess(
        "Project created successfully."
      );

      setTitle("");
      setDescription("");
      setTechStack("");
      setGithubUrl("");
      setLiveUrl("");
      setFeatured(false);

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong."
      );
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

      <h2 className="text-3xl font-bold text-white mb-8">
        Add New AI Project
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) =>
              setTechStack(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="GitHub URL"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Live Demo URL"
            value={liveUrl}
            onChange={(e) =>
              setLiveUrl(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
          />
        </div>

        <label className="flex items-center gap-3 text-white">

          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(e.target.checked)
            }
          />

          Featured Project

        </label>

        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 transition-all px-6 py-3 rounded-xl text-black font-semibold"
        >
          Create Project
        </button>

      </form>
    </div>
  );
}