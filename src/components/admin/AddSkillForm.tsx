"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";

import { Skill } from "../../types/skill";
import { SkillCategory } from "../../types/skillCategory";

interface AddSkillFormProps {
  skillCategories: SkillCategory[];

  setSkills: React.Dispatch<
    React.SetStateAction<Skill[]>
  >;
}

export default function AddSkillForm({
  skillCategories,
  setSkills,
}: AddSkillFormProps) {
  const [name, setName] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [level, setLevel] = useState(80);

  const [icon, setIcon] = useState("");

  const [displayOrder, setDisplayOrder] = useState(1);

  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError(
        "Please enter a skill name."
      );setTimeout(() => {
  setError("");
}, 3000);
      return;
    }

    if (!categoryId) {
      setError(
        "Please select a category."
      );setTimeout(() => {
  setError("");
}, 3000);
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
          "/skills",
          {
             name,

            level,

            icon,

            displayOrder,

            featured,

            categoryId: Number(categoryId),
            
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSkills((prev) => [
        ...prev,
        response.data,
      ]);

      setName("");    

      setCategoryId("");

      setLevel(80);

      setIcon("");

      setDisplayOrder(1);

      setFeatured(false);

      setSuccess(
        "Skill created successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (error) {
      console.error(error);

      setError(
        "Failed to create skill."
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
        mb-8
        "
      >
        Add Skill
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
            Skill Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Python"
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-zinc-300
            dark:border-zinc-700
            bg-zinc-100
            dark:bg-black
            "
          />
        </div>
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
    Skill Level (%)
  </label>

  <input
    type="number"
    min={0}
    max={100}
    value={level}
    onChange={(e) =>
      setLevel(Number(e.target.value))
    }
    className="
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-zinc-300
    dark:border-zinc-700
    bg-zinc-100
    dark:bg-black
    "
  />
</div>
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
    Icon Name
  </label>

  <input
    type="text"
    placeholder="python"
    value={icon}
    onChange={(e) =>
      setIcon(e.target.value)
    }
    className="
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-zinc-300
    dark:border-zinc-700
    bg-zinc-100
    dark:bg-black
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
            Category
          </label>

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            border-zinc-300
            dark:border-zinc-700
            bg-zinc-100
            dark:bg-black
            "
          >
            <option value="">
              Select Category
            </option>

            {skillCategories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.title}
                </option>
              )
            )}
          </select>
        </div>
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
    Display Order
  </label>

  <input
    type="number"
    min={1}
    value={displayOrder}
    onChange={(e) =>
      setDisplayOrder(
        Number(e.target.value)
      )
    }
    className="
    w-full
    px-4
    py-3
    rounded-xl
    border
    border-zinc-300
    dark:border-zinc-700
    bg-zinc-100
    dark:bg-black
    "
  />
</div>
        {error && (
          <div
            className="
            p-4
            rounded-xl
            bg-red-50
            border
            border-red-200
            text-red-600
            "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
            p-4
            rounded-xl
            bg-green-50
            border
            border-green-200
            text-green-600
            "
          >
            {success}
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
    onChange={(e) =>
      setFeatured(
        e.target.checked
      )
    }
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
        <LoadingButton
          type="button"
          loading={loading}
          disabled={loading}
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
          Create Skill
        </LoadingButton>

      </div>
    </div>
  );
}