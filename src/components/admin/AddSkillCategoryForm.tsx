"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";

import { SkillCategory } from "../../types/skillCategory";

interface AddSkillCategoryFormProps {
  setSkillCategories:
    React.Dispatch<
      React.SetStateAction<SkillCategory[]>
    >;
}

export default function AddSkillCategoryForm({
  setSkillCategories,
}: AddSkillCategoryFormProps) {
  const [title, setTitle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleCreate = async () => {
    if (!title.trim()) {
      setError(
        "Please enter a category title."
      );
      return;
    }

    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      const response =
        await api.post(
          "/skill-categories",
          {
            title,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSkillCategories((prev) => [
        ...prev,
        response.data,
      ]);

      setTitle("");

      setSuccess(
        "Category created successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setError(
        "Failed to create category."
      );
    } finally {
      setLoading(false);
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
        Add Skill Category
      </h2>

      <div className="space-y-6">

        <div>
          <label
            className="
            block
            mb-2
            font-medium
            text-black
            dark:text-white
            "
          >
            Category Title
          </label>

          <input
            type="text"
            value={title}
            placeholder="Machine Learning"
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-zinc-100
            dark:bg-black
            border
            border-zinc-300
            dark:border-zinc-700
            "
          />
        </div>

        {error && (
          <div
            className="
            rounded-xl
            border
            border-red-300
            bg-red-50
            px-4
            py-3
            text-red-700
            "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
            rounded-xl
            border
            border-green-300
            bg-green-50
            px-4
            py-3
            text-green-700
            "
          >
            ✓ {success}
          </div>
        )}

        <LoadingButton
          type="button"
          loading={loading}
          onClick={handleCreate}
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
          Create Category
        </LoadingButton>

      </div>
    </div>
  );
}