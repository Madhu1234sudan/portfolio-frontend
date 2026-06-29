"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import AdminInput from "@/src/common/AdminInput";
import AdminSelect from "@/src/common/AdminSelect";

import AddButton from "@/src/buttons/AddButton";

import { Skill } from "@/src/types/skill";
import { SkillCategory } from "@/src/types/skillCategory";

interface AddSkillFormProps {
  skillCategories: SkillCategory[];
  refreshSkillCategories: () => Promise<void>;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

export default function AddSkillForm({
  skillCategories,
  setSkills,
  refreshSkillCategories,
}: AddSkillFormProps) {
  const [name, setName] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [level, setLevel] = useState(80);

  const [icon, setIcon] = useState("");

  const [order, setOrder] = useState(1);

  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Please enter a skill name.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
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
        "/skills",
        {
          name,

          level,

          icon,

          order,

          featured,

          categoryId: Number(categoryId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSkills((prev) => [...prev, response.data]);
      await refreshSkillCategories();
      setName("");

      setCategoryId("");

      setLevel(80);

      setIcon("");

      setOrder(1);

      setFeatured(false);

      setSuccess("Skill created successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setError("Failed to create skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminCard>
      <AdminSectionHeader
        title="Add Skill"
        subtitle="Create and organize your technical skills."
      />

      <div className="space-y-6">
        <AdminInput
          label="Skill Name"
          placeholder="Python"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <AdminInput
            label="Skill Level (%)"
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />
          <AdminInput
            label="Icon Name"
            placeholder="python"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />

          <AdminSelect
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>

            {skillCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </AdminSelect>
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
          <div
            className="
  flex
  items-center
  gap-3
  "
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="
    h-5
    w-5
    cursor-pointer
    "
            />

            <label
              className="
    text-black
    dark:text-white
    font-medium
    "
            >
              Featured Skill
            </label>
          </div>
          <div className="flex justify-start pt-2">
            <AddButton type="button" loading={loading} onClick={handleCreate}>
              Add Skill
            </AddButton>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}
