"use client";

import { useEffect, useState } from "react";

import api from "@/src/lib/api";

import Modal from "@/src/dialogs/Modal";

import AdminInput from "@/src/common/AdminInput";

import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";

import { Skill } from "@/src/types/skill";
import { SkillCategory } from "@/src/types/skillCategory";

interface EditSkillModalProps {
  open: boolean;

  onClose: () => void;

  skill: Skill | null;
  refreshSkillCategories: () => Promise<void>;
  skillCategories: SkillCategory[];

  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

export default function EditSkillModal({
  open,
  onClose,
  skill,
  skillCategories,
  setSkills,
}: EditSkillModalProps) {
  const [name, setName] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [level, setLevel] = useState(80);

  const [icon, setIcon] = useState("");

  const [order, setOrder] = useState(1);

  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!skill) return;

    setName(skill.name);

    setCategoryId(String(skill.categoryId));

    setLevel(skill.level ?? 80);

    setIcon(skill.icon ?? "");

    setOrder(skill.order);

    setFeatured(skill.featured);
  }, [skill]);

  if (!open || !skill) {
    return null;
  }

  const handleUpdate = async () => {
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

      const response = await api.put(
        `/skills/${skill.id}`,
        {
          name,
          categoryId: Number(categoryId),
          level,
          icon,
          order,
          featured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSkills((prev) =>
        prev.map((item) => (item.id === skill.id ? response.data : item)),
      );

      setSuccess("Skill updated successfully.");

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error(error);

      setError("Failed to update skill.");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal open={open} title="Edit Skill" onClose={onClose}>
      <div className="space-y-6">
        <AdminInput
          label="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <label className="block mb-2 font-medium">Category</label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
          >
            {skillCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <AdminInput
            label="Skill Level"
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />

          <AdminInput
            label="Display Order"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>

        <AdminInput
          label="Icon"
          value={icon}
          placeholder="python"
          onChange={(e) => setIcon(e.target.value)}
        />

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
              "
          />

          <label className="font-medium">Featured Skill</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div
          className="
            flex
            justify-end
            gap-4
            pt-4
            "
        >
          {error && <p className="text-red-500">{error}</p>}

          {success && <p className="text-emerald-500">{success}</p>}
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton
            type="button"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
