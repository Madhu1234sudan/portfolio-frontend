"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import AdminInput from "@/src/common/AdminInput";

import AddButton from "@/src/buttons/AddButton";

import { SkillCategory } from "@/src/types/skillCategory";

interface AddSkillCategoryFormProps {
  setSkillCategories: React.Dispatch<
    React.SetStateAction<SkillCategory[]>
  >;

  refreshSkillCategories: () => Promise<void>;
}

export default function AddSkillCategoryForm({
  setSkillCategories,
  refreshSkillCategories,
}: AddSkillCategoryFormProps) {
  const [title, setTitle] = useState("");

  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Please enter a category title.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);

      setError("");
      setSuccess("");

      const token = sessionStorage.getItem("adminToken");

      const response = await api.post(
        "/skill-categories",
        {
          title,
          order,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await refreshSkillCategories();

      setTitle("");
      setOrder(1);
      setSuccess("Category created successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminCard>
      <AdminSectionHeader
        title="Add Skill Category"
        subtitle="Organize your skills into reusable categories."
      />

      <div className="space-y-6">
        <AdminInput
          label="Category Title"
          placeholder="Machine Learning"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <AdminInput
  label="Display Order"
  type="number"
  value={order}
  onChange={(e) => setOrder(Number(e.target.value))}
/>

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
  border-[var(--accent)]/20
  bg-[var(--accent)]/10
  px-4
  py-3
  text-[var(--accent)]
  "
          >
            ✓ {success}
          </div>
        )}
        <div className="flex justify-start pt-2">
          <AddButton type="button" loading={loading} onClick={handleCreate}>
            Add Category
          </AddButton>
        </div>
      </div>
    </AdminCard>
  );
}
