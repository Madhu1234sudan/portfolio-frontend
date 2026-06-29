"use client";

import { useState, useEffect } from "react";

import api from "@/src/lib/api";

import Modal from "@/src/dialogs/Modal";

import AdminInput from "@/src/common/AdminInput";

import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";

import { SkillCategory } from "@/src/types/skillCategory";

interface EditSkillCategoryModalProps {
  open: boolean;

  onClose: () => void;

  category: SkillCategory | null;

  setSkillCategories: React.Dispatch<
    React.SetStateAction<SkillCategory[]>
  >;

  refreshSkillCategories: () => Promise<void>;
}

export default function EditSkillCategoryModal({
  open,
  onClose,
  category,
  setSkillCategories,
  refreshSkillCategories,
}: EditSkillCategoryModalProps) {
  const [title, setTitle] = useState("");

  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      const token = sessionStorage.getItem("adminToken");

      const response = 
      await api.put(`/skill-categories/${category.id}`,
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

      setSuccess("Category updated successfully.");

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1000);
    } catch (error) {
      console.error(error);

      setError("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="Edit Skill Category" onClose={onClose}>
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
          <AdminInput
            label="Category Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <AdminInput
            label="Display Order"
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
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
          <SecondaryButton type="button" onClick={onClose}>
            Cancel
          </SecondaryButton>

          <PrimaryButton
            type="button"
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading ? "Saving..." : "Save Changes"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
