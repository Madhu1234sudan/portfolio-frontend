"use client";

import { useState, useEffect } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";

import { SkillCategory } from "../../types/skillCategory";

interface EditSkillCategoryModalProps {
  open: boolean;

  onClose: () => void;

  category: SkillCategory | null;

  setSkillCategories: React.Dispatch<
    React.SetStateAction<SkillCategory[]>
  >;
}

export default function EditSkillCategoryModal({
  open,
  onClose,
  category,
  setSkillCategories,
}: EditSkillCategoryModalProps) {
  const [title, setTitle] =
    useState("");

  const [order, setOrder] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (category) {
      setTitle(category.title);

      setOrder(category.order);
    }
  }, [category]);

  if (!open || !category) {
    return null;
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);

      setError("");

      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      const response =
        await api.put(
          `/skill-categories/${category.id}`,
          {
            title,
            order,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSkillCategories((prev) =>
        prev.map((item) =>
          item.id === category.id
            ? {
                ...item,
                ...response.data,
              }
            : item
        )
      );

      onClose();

    } catch (error) {
      console.error(error);

      setError(
        "Failed to update category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      "
    >
      <div
        className="
        w-full
        max-w-lg
        rounded-2xl
        bg-white
        dark:bg-zinc-900
        border
        border-zinc-300
        dark:border-zinc-800
        p-8
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-8
          text-black
          dark:text-white
          "
        >
          Edit Skill Category
        </h2>

        <div className="space-y-6">

          <div>
            <label
              className="
              block
              mb-2
              font-medium
              "
            >
              Category Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
              w-full
              rounded-xl
              border
              border-zinc-300
              dark:border-zinc-700
              bg-zinc-100
              dark:bg-black
              px-4
              py-3
              "
            />
          </div>

          <div>
            <label
              className="
              block
              mb-2
              font-medium
              "
            >
              Display Order
            </label>

            <input
              type="number"
              value={order}
              onChange={(e) =>
                setOrder(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
              w-full
              rounded-xl
              border
              border-zinc-300
              dark:border-zinc-700
              bg-zinc-100
              dark:bg-black
              px-4
              py-3
              "
            />
          </div>

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <div
            className="
            flex
            justify-end
            gap-4
            pt-4
            "
          >
            <button
              onClick={onClose}
              className="
              px-6
              py-3
              rounded-xl
              border
              border-zinc-300
              dark:border-zinc-700
              "
            >
              Cancel
            </button>

            <LoadingButton
              type="button"
              loading={loading}
              disabled={loading}
              onClick={handleUpdate}
              className="
              bg-green-500
              hover:bg-green-400
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
              "
            >
              Save Changes
            </LoadingButton>

          </div>

        </div>

      </div>
    </div>
  );
}