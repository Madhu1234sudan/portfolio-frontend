"use client";

import api from "@/src/lib/api";

import { SkillCategory } from "@/src/types/skillCategory";
import { useState } from "react";

import ConfirmationDialog from "@/src/dialogs/ConfirmationDialog";

interface SkillCategoryTableProps {
  skillCategories: SkillCategory[];

  setSkillCategories: React.Dispatch<
    React.SetStateAction<SkillCategory[]>
  >;

  refreshSkillCategories: () => Promise<void>;

  setEditingCategory:  React.Dispatch<
    React.SetStateAction<SkillCategory | null>
  >;

  setEditCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SkillCategoryTable({
  skillCategories,
  setSkillCategories,
  refreshSkillCategories,
  setEditingCategory,
  setEditCategoryOpen,
}: SkillCategoryTableProps) {
  const [deleteCategory, setDeleteCategory] = useState<SkillCategory | null>(
    null,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    if (!deleteCategory) return;

    try {
      setDeleting(true);

      const token = sessionStorage.getItem("adminToken");

      await api.delete(`/skill-categories/${deleteCategory.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await refreshSkillCategories();

      setDeleteDialogOpen(false);

      setDeleteCategory(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
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
      <div className="flex items-center justify-between mb-8">
        <h2
          className="
          text-3xl
          font-bold
          text-black
          dark:text-white
          "
        >
          Skill Categories
        </h2>

        <span
          className="
          text-sm
          text-zinc-500
          "
        >
          {skillCategories.length} Categories
        </span>
      </div>

      {skillCategories.length === 0 ? (
        <div
          className="
          text-center
          py-12
          text-zinc-500
          "
        >
          No categories found.
        </div>
      ) : (
        <div
          className="
          overflow-x-auto
          "
        >
          <table className="w-full">
            <thead
              className="
              bg-zinc-100
              dark:bg-black
              "
            >
              <tr>
                <th
                  className="
                  text-left
                  p-5
                  text-zinc-600
                  dark:text-zinc-400
                  "
                >
                  Title
                </th>

                <th
                  className="
                  text-left
                  p-5
                  text-zinc-600
                  dark:text-zinc-400
                  "
                >
                  Order
                </th>

                <th
                  className="
                  text-left
                  p-5
                  text-zinc-600
                  dark:text-zinc-400
                  "
                >
                  Skills
                </th>

                <th
                  className="
                  text-left
                  p-5
                  text-zinc-600
                  dark:text-zinc-400
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {skillCategories.map((category) => (
                <tr
                  key={category.id}
                  className="
                    border-b
                    border-zinc-200
                    dark:border-zinc-800
                    "
                >
                  <td className="p-5">{category.title}</td>

                  <td className="p-5">{category.order}</td>

                  <td className="p-5">{category.skills?.length}</td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingCategory(category);

                          setEditCategoryOpen(true);
                        }}
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-blue-500
                          hover:bg-blue-400
                          text-white
                          transition-all
                          "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeleteCategory(category);

                          setDeleteDialogOpen(true);
                        }}
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-red-500
                          hover:bg-red-400
                          text-white
                          transition-all
                          "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Skill Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);

          setDeleteCategory(null);
        }}
      />
    </div>
  );
}
