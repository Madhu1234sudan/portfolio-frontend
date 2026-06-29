"use client";

import Image from "next/image";

import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import AdminInput from "@/src/common/AdminInput";
import AdminTextarea from "@/src/common/AdminTextarea";
import AdminFileUpload from "@/src/common/AdminFileUpload";

import AddButton from "@/src/buttons/AddButton";
import { useState } from "react";

import api from "@/src/lib/api";
import { Research } from "@/src/types/research";
import AdminPage from "@/app/admin/dashboard/page";
import { uploadImage } from "@/src/upload/imageUpload";

interface AddResearchFormProps {
  setResearch: React.Dispatch<
    React.SetStateAction<Research[]>
  >;
}

export default function AddResearchForm({
  setResearch,
}: AddResearchFormProps) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [description, setDescription] =
    useState("");

  const [tags, setTags] = useState("");

  const [githubUrl, setGithubUrl] =
    useState("");

  const [publicationUrl, setPublicationUrl] =
    useState("");

  const [pdfUrl, setPdfUrl] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [researchImageFile,
    setResearchImageFile] =
    useState<File | null>(null);

  const [uploadingImage,
    setUploadingImage] =
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
      !abstract.trim() ||
      !description.trim() ||
      !tags.trim()
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    try {
      setError("");
      setSuccess("");

    setUploadingImage(true);

const uploadedImageUrl =
  await uploadImage(researchImageFile);

setUploadingImage(false);

      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      const response = await api.post(
        "/research",
        {
          title,
          abstract,
          description,

          tags: tags
            .split(",")
            .map((tag) =>
              tag.trim()
            ),

          githubUrl,
          publicationUrl,
          pdfUrl,

          researchImage:
            uploadedImageUrl,

          featured,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setResearch((prev) => [
        response.data,
        ...prev,
      ]);

      setSuccess(
        "Research created successfully."
      );

      setTitle("");
      setAbstract("");
      setDescription("");
      setTags("");

      setGithubUrl("");
      setPublicationUrl("");
      setPdfUrl("");

      setFeatured(false);

      setResearchImageFile(null);

    } catch (error) {
      console.error(error);

      setError(
        "Failed to create research."
      );
    }
  };

  return (
    <AdminCard>
     <AdminSectionHeader
  title="Add Research"
  subtitle="Create and manage your research publications."
/>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <AdminInput
  label="Research Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

       <AdminTextarea
  label="Abstract"
  rows={5}
  value={abstract}
  onChange={(e) => setAbstract(e.target.value)}
/>

       <AdminTextarea
  label="Description"
  rows={8}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

       <AdminInput
  label="Tags"
  placeholder="Machine Learning, NLP, Computer Vision"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
/>
        <AdminInput
          label="GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          
        />

        <AdminInput
          label="Publication URL"
          value={publicationUrl}
          onChange={(e) =>setPublicationUrl(e.target.value)}/>

        <AdminInput
          label="PDF URL"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}/>


          <AdminFileUpload
  label="Research Image"
  accept="image/*"
  preview={
    researchImageFile
      ? URL.createObjectURL(researchImageFile)
      : null
  }
  onChange={(file) => {
    if (!file) return;

    setResearchImageFile(file);
  }}
/>
            
     

        {researchImageFile && (
          <Image
            src={URL.createObjectURL(
              researchImageFile
            )}
            alt="Preview"
            width={600}
            height={200}
            className="
            w-full
            h-48
            object-cover
            rounded-xl
            border
            border-zinc-300
            dark:border-zinc-700
            "
          />
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
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured Research
        </label>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500">
            {success}
          </p>
        )}
<div className="flex justify-start pt-2">
       <AddButton
  type="submit"
  loading={uploadingImage}
>
  Add Research
</AddButton>
</div>
      </form>
    </AdminCard>
  );
}