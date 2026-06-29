"use client";
import Modal from "@/src/dialogs/Modal";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import AdminInput from "@/src/common/AdminInput";
import AdminTextarea from "@/src/common/AdminTextarea";
import AdminFileUpload from "@/src/common/AdminFileUpload";

import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";
import Image from "next/image";
import { useState } from "react";
import api from "@/src/lib/api";

import { uploadImage } from "@/src/upload/imageUpload";

import { Project } from "@/src/types/project";

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

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState(project.imageUrl || "");

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSave = async () => {
    try {
      setUploadingImage(true);

      let updatedImageUrl = project.imageUrl || "";

      try {
        if (imageFile) {
          updatedImageUrl = await uploadImage(imageFile);
        }

        // existing PUT request...
      } finally {
        setUploadingImage(false);
      }
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
    //
    <Modal open={true} title="Edit Project" onClose={onClose}>
      <div className="flex items-center justify-between mb-8">
        <AdminSectionHeader
          title="Edit Project"
          subtitle="Update your portfolio project."
        />
      </div>

      <form className="space-y-6">
        <div>
          <AdminInput
            label="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <AdminTextarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <AdminInput
            label="Tech Stack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>

        <AdminInput
          label="GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        <AdminInput
          label="Live Demo URL"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
        />
        <div>
          <AdminFileUpload
            label="Project Image"
            accept="image/*"
            preview={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
            onChange={(file) => {
              if (file) {
                setImageFile(file);
              }
            }}
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
        <label
          className="
flex
items-center
gap-3
text-black
dark:text-white
"
        >
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured Project
        </label>

        <div className="flex gap-4 pt-4">
          <div className="flex justify-end gap-4 pt-6">
            <SecondaryButton type="button" onClick={onClose}>
              Cancel
            </SecondaryButton>

            <PrimaryButton
              type="button"
              disabled={uploadingImage}
              onClick={handleSave}
            >
              {uploadingImage ? "Saving..." : "Save Changes"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}
