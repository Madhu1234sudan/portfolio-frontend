"use client";

import LoadingButton from "../ui/LoadingButton";
import Image from "next/image";
import { useState } from "react";

import api from "../../lib/api";
import { Research } from "../../types/research";

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

  const uploadImage = async () => {
    if (!researchImageFile) {
      return "";
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();

      formData.append(
        "image",
        researchImageFile
      );

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

      const uploadedImageUrl =
        await uploadImage();

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
    <div
      className="
      bg-white
      dark:bg-zinc-900
      border
      border-zinc-300
      dark:border-zinc-800
      rounded-2xl
      p-8
      shadow-sm
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        text-black
        dark:text-white
        mb-8
        "
      >
        Add New Research
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input
          type="text"
          placeholder="Research Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <textarea
          placeholder="Abstract"
          value={abstract}
          onChange={(e) =>
            setAbstract(e.target.value)
          }
          className="w-full h-28 bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <textarea
          placeholder="Full Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full h-40 bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
          className="w-full bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <input
          type="text"
          placeholder="GitHub URL"
          value={githubUrl}
          onChange={(e) =>
            setGithubUrl(
              e.target.value
            )
          }
          className="w-full bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <input
          type="text"
          placeholder="Publication URL"
          value={publicationUrl}
          onChange={(e) =>
            setPublicationUrl(
              e.target.value
            )
          }
          className="w-full bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <input
          type="text"
          placeholder="PDF URL"
          value={pdfUrl}
          onChange={(e) =>
            setPdfUrl(
              e.target.value
            )
          }
          className="w-full bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-black dark:text-white"
        />

        <div>
          <label
            className="
            block
            mb-2
            text-black
            dark:text-white
            font-medium
            "
          >
            Research Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (
                e.target.files?.[0]
              ) {
                setResearchImageFile(
                  e.target.files[0]
                );
              }
            }}
            className="
            w-full
            bg-zinc-100
            cursor-pointer
            dark:bg-black
            border
            border-zinc-300
            dark:border-zinc-700
            rounded-xl
            px-4
            py-3
            "
          />
        </div>

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

        <LoadingButton
          type="submit"
          loading={uploadingImage}
          className="
          bg-green-500
          hover:bg-green-400
          px-6
          py-3
          rounded-xl
          text-black
          font-semibold
          "
        >
          Create Research
        </LoadingButton>
      </form>
    </div>
  );
}