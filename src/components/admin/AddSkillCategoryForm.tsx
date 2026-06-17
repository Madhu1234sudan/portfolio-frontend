"use client";

import { useState } from "react";
import api from "../../lib/api";
import LoadingButton from "../ui/LoadingButton";

import { SkillCategory } from "../../types/skillCategory";

interface AddSkillCategoryFormProps {
  setSkillCategories: React.Dispatch<
    React.SetStateAction<SkillCategory[]>
  >;
}

export default function AddSkillCategoryForm({
  setSkillCategories,
}: AddSkillCategoryFormProps) {
  const [title, setTitle] = useState("");

  const [icon, setIcon] = useState("");

  const [order, setOrder] = useState(1);

  const [loading, setLoading] =
    useState(false);
    
  const handleSubmit = async () => {
  if (!title.trim()) {
    return;
  }

  try {
    setLoading(true);

    const token =
      sessionStorage.getItem("adminToken");

    const response = await api.post(
      "/skill-categories",
      {
        title,
        icon,
        order,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSkillCategories((prev) => [
      response.data,
      ...prev,
    ]);

    setTitle("");
    setIcon("");
    setOrder(1);

  } catch (error) {
    console.error(error);
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
    <h2 className="text-3xl font-bold mb-8">
      Add Skill Category
    </h2>

    <div className="space-y-6">

      <div>
        <label className="block mb-2 font-medium">
          Category Title
        </label>

        <input
          type="text"
          value={title}
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

      <div>
        <label className="block mb-2 font-medium">
          Lucide Icon Name
        </label>

        <input
          type="text"
          value={icon}
          onChange={(e) =>
            setIcon(e.target.value)
          }
          placeholder="BrainCircuit"
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

      <div>
        <label className="block mb-2 font-medium">
          Display Order
        </label>

        <input
          type="number"
          value={order}
          onChange={(e) =>
            setOrder(Number(e.target.value))
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

      <LoadingButton
        type="button"
        loading={loading}
        onClick={handleSubmit}
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
        Add Category
      </LoadingButton>

    </div>
  </div>
);
}