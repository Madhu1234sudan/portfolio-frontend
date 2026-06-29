"use client";


import { useState } from "react";

import api from "@/src/lib/api";

import { uploadImage } from "@/src/upload/imageUpload";
import { Project } from "@/src/types/project";
import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import AdminInput from "@/src/common/AdminInput";
import AdminTextarea from "@/src/common/AdminTextarea";
import AdminFileUpload from "@/src/common/AdminFileUpload";
import AddButton from "@/src/buttons/AddButton";

interface AddProjectFormProps {
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function AddProjectForm({ setProjects }: AddProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [techStack, setTechStack] = useState("");

  const [githubUrl, setGithubUrl] = useState("");

  const [liveUrl, setLiveUrl] = useState("");

  const [featured, setFeatured] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);


  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim() || !description.trim() || !techStack.trim()) {
    setError("Please fill all required fields.");

    setTimeout(() => setError(""), 3000);
    return;
  }

  setError("");
  setSuccess("");

  try {
    setUploadingImage(true);

const uploadedImageUrl =
  await uploadImage(imageFile);

setUploadingImage(false);

    const token = sessionStorage.getItem("adminToken");

    const response = await api.post(
      "/projects",
      {
        title,
        description,
        techStack: techStack.split(",").map((tech) => tech.trim()),
        githubUrl,
        liveUrl,
        imageUrl: uploadedImageUrl,
        featured,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjects((prev) => [response.data, ...prev]);

    setTitle("");
    setDescription("");
    setTechStack("");
    setGithubUrl("");
    setLiveUrl("");
    setFeatured(false);
    setImageFile(null);

    setSuccess("Project created successfully.");

    setTimeout(() => setSuccess(""), 3000);
  } catch (error) {
    console.error(error);

    setError("Failed to create project.");

    setTimeout(() => setError(""), 3000);
  }
};
  return (
  <AdminCard>
                      <AdminSectionHeader
    title="Add Project"
    subtitle="Create a new project for your portfolio."
/>
      <form onSubmit={handleSubmit} className="space-y-6">
        
          <AdminInput
    label="Project Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Enter project title"
/>
        

        <div>
          <AdminTextarea
    label="Project Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Describe your project"
/>
        </div>

        <div>
          <AdminInput
            label="Tech Stack(Comma Seperated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="Enter Tech-Stack"
          />
        </div>

        <div>
          <AdminInput
            label="GitHub URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="Enter a Github URL"
                                      />
        </div>

        <div>
          <AdminInput
            label="Live Demo URL"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="Enter Live Demo URL"
                                          />
        </div>
        <div>
  

  <AdminFileUpload
    label="Project Image"
    accept="image/*"
    preview={
        imageFile
            ? URL.createObjectURL(imageFile)
            : null
    }
    onChange={(file) => {
        if (!file) return;

        setImageFile(file);
    }}
/>
                  
</div>

       <div className="flex items-center gap-3">
  <input
    id="featured"
    type="checkbox"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
    className="
      h-4
      w-4
      rounded
      border-[var(--border)]
      accent-[var(--primary)]
    "
  />

  <label
    htmlFor="featured"
    className="font-medium text-[var(--foreground)]"
  >
    Featured Project
  </label>
</div>
{error && (
  <div
    className="
    rounded-xl
    border
    border-red-500/20
    bg-red-500/10
    px-4
    py-3
    text-red-500
    font-medium
    "
  >
    ⚠ {error}
  </div>
)}
       {success && (
  <div
    className="
    rounded-xl
    border
    border-[var(--accent)]/20
    bg-[var(--accent)]/10
    px-4
    py-3
    text-[var(--accent)]
    font-medium
    "
  >
    ✓ {success}
  </div>
)}
  <div className="flex justify-start pt-2">
        <AddButton
  type="submit"
  loading={uploadingImage}
>
  Add Project
</AddButton>
</div>
      </form>
      
    </AdminCard>
  );
}
