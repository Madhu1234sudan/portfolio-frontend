"use client";
import Modal from "@/src/dialogs/Modal";

import AdminInput from "@/src/common/AdminInput";
import AdminTextarea from "@/src/common/AdminTextarea";
import AdminFileUpload from "@/src/common/AdminFileUpload";

import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";
import Image from "next/image";
import { useState } from "react";
import api from "@/src/lib/api";

import { Research } from "@/src/types/research";

import { uploadImage } from "@/src/upload/imageUpload";
interface EditResearchModalProps {
  research: Research;

  onClose: () => void;

  onUpdate: (updatedResearch: Research) => void;
}

export default function EditResearchModal({
  research,
  onClose,
  onUpdate,
}: EditResearchModalProps) {
  const [title, setTitle] = useState(research.title);

  const [abstract, setAbstract] = useState(research.abstract);

  const [description, setDescription] = useState(research.description);

  const [tags, setTags] = useState(research.tags.join(", "));

  const [githubUrl, setGithubUrl] = useState(research.githubUrl || "");

  const [publicationUrl, setPublicationUrl] = useState(
    research.publicationUrl || "",
  );

  const [pdfUrl, setPdfUrl] = useState(research.pdfUrl || "");

  const [featured, setFeatured] = useState(research.featured);
  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSave = async () => {
    try {
      setUploadingImage(true);

      setError("");
      setSuccess("");

      let updatedImageUrl = research.researchImage || "";

      if (imageFile) {
        updatedImageUrl = await uploadImage(imageFile);
      }

      const token = sessionStorage.getItem("adminToken");

      const response = await api.put(
        `/research/${research.id}`,
        {
          title,
          abstract,
          description,

          tags: tags.split(",").map((tag) => tag.trim()),

          githubUrl,
          publicationUrl,
          pdfUrl,

          researchImage: updatedImageUrl,

          featured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onUpdate(response.data);

      setSuccess("Research updated successfully.");

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);

      setError("Failed to update research.");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setUploadingImage(false);
    }
  };
  return (
    <Modal open={true} title="Edit Research" onClose={onClose}>
      <form className="space-y-6">
        <div>
          <AdminInput
            label="Research Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <AdminTextarea
            label="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
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
            label="Tags (Comma Separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <AdminInput
          label="GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <AdminInput
          label="Publication URL"
          value={publicationUrl}
          onChange={(e) => setPublicationUrl(e.target.value)}
        />
        <AdminInput
          label="PDF URL"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
        />
        <div>
          <AdminFileUpload
            label="Research Image"
            accept="image/*"
            preview={
              imageFile
                ? URL.createObjectURL(imageFile)
                : research.researchImage
            }
            onChange={(file) => {
              if (!file) return;

              setImageFile(file);
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
          Featured Research
        </label>
        {error && <p className="text-red-500">{error}</p>}

        {success && <p className="text-emerald-500">{success}</p>}
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
      </form>
    </Modal>
  );
}
