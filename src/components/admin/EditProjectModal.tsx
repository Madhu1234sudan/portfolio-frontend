"use client";
import LoadingButton from "../ui/LoadingButton";
import Image from "next/image";
import { useState } from "react";
import api from "@/src/lib/api";

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
  const [title, setTitle] = useState(project.title);

  const [description, setDescription] = useState(project.description);

  const [techStack, setTechStack] = useState(project.techStack.join(", "));

  const [githubUrl, setGithubUrl] = useState(project.githubUrl || "");

  const [liveUrl, setLiveUrl] = useState(project.liveUrl || "");

  const [featured, setFeatured] = useState(project.featured);
  const [imageFile, setImageFile] =
  useState<File | null>(null);

const [imageUrl, setImageUrl] =
  useState(project.imageUrl || "");

const [uploadingImage, setUploadingImage] =
  useState(false);
  const uploadImage = async () => {
  if (!imageFile) {
    return imageUrl;
  }

  try {
    setUploadingImage(true);

    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await api.post(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  } finally {
    setUploadingImage(false);
  }
};
  const handleSave = async () => {
    try {
      const updatedImageUrl =
      await uploadImage();
      const token = sessionStorage.getItem("adminToken");

      const response = await api.put(
        `/projects/${project.id}`,
        {
          title,
          description,

          techStack: techStack.split(",").map((tech) => tech.trim()),

          githubUrl,
          liveUrl,
          imageUrl: updatedImageUrl,
          featured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onUpdate(response.data);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
  className="
  fixed
  inset-0
  bg-black/70
  flex
  items-center
  justify-center
  z-50
  p-6
  overflow-y-auto
"
>
      <div
  className="
  w-full
  max-w-2xl
  max-h-[90vh]
  overflow-y-auto
  bg-white
  dark:bg-zinc-900
  border
  border-zinc-300
  dark:border-zinc-800
  rounded-2xl
  p-8
  shadow-2xl
"
>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-white">Edit Project</h2>

          <button
            onClick={onClose}
            className="
text-zinc-500
dark:text-zinc-400
hover:text-black
dark:hover:text-white
text-xl
transition-colors
"
          >
            ✕
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="
block
text-black
dark:text-white
mb-2
font-medium
">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
w-full
px-4
py-3
rounded-xl
bg-zinc-50
dark:bg-zinc-950
border
border-zinc-200
dark:border-zinc-700
text-black
dark:text-white
focus:outline-none
focus:ring-2
focus:ring-green-500
focus:border-green-500
transition-all
"
            />
          </div>

          <div>
            <label className="block text-black dark:text-white mb-2 font-medium">
  Description <span className="text-red-500">*</span>
</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
w-full
h-32
bg-zinc-100
dark:bg-black
border
border-zinc-300
dark:border-zinc-700
rounded-xl
px-4
py-3
text-black
dark:text-white
focus:outline-none
focus:border-green-400
transition-all
"
            />
          </div>

          <div>
            <label className="block text-black dark:text-white mb-2 font-medium">
  Tech Stack <span className="text-red-500">*</span>
</label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="
w-full
px-4
py-3
rounded-xl
bg-zinc-50
dark:bg-zinc-950
border
border-zinc-200
dark:border-zinc-700
text-black
dark:text-white
focus:outline-none
focus:ring-2
focus:ring-green-500
focus:border-green-500
transition-all
"
            />
          </div>

          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="
w-full
px-4
py-3
rounded-xl
bg-zinc-50
dark:bg-zinc-950
border
border-zinc-200
dark:border-zinc-700
text-black
dark:text-white
focus:outline-none
focus:ring-2
focus:ring-green-500
focus:border-green-500
transition-all
"
          />

          <input
            type="text"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
           className="
w-full
px-4
py-3
rounded-xl
bg-zinc-50
dark:bg-zinc-950
border
border-zinc-200
dark:border-zinc-700
text-black
dark:text-white
focus:outline-none
focus:ring-2
focus:ring-green-500
focus:border-green-500
transition-all
"
          />
          <div>
  <label
    className="
    block
    text-black
    dark:text-white
    mb-2
    font-medium
    "
  >
    Project Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setImageFile(
          e.target.files[0]
        );
      }
    }}
    className="
    w-full
    px-4
    py-3
    rounded-xl
    bg-zinc-50
    dark:bg-zinc-950
    border
    border-zinc-200
    dark:border-zinc-700
    text-black
    dark:text-white
    "
  />
</div>
{imageFile && (
  <div className="mt-4">
    <Image
  src={URL.createObjectURL(imageFile)}
  alt="Preview"
  width={600}
  height={160}
  className="
  h-40
  w-full
  object-cover
  rounded-xl
  border
  border-zinc-300
  dark:border-zinc-700
  "
/>
  </div>
)}
          <label className="
flex
items-center
gap-3
text-black
dark:text-white
">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Project
          </label>

          <div className="flex gap-4 pt-4">
            <LoadingButton
  type="button"
  onClick={handleSave}
  loading={uploadingImage}
  className="
  px-6
  py-3
  rounded-xl
  bg-green-500
  hover:bg-green-400
  text-black
  font-semibold
  shadow-lg
  shadow-green-500/20
  transition-all
  "
>
  Save Changes
</LoadingButton>
            <button
              type="button"
              onClick={onClose}
              className="
px-6
py-3
rounded-xl
bg-zinc-100
dark:bg-zinc-800
border
border-zinc-300
dark:border-zinc-700
text-black
dark:text-white
font-semibold
hover:bg-zinc-200
dark:hover:bg-zinc-700
transition-all
"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
