"use client";

import { useEffect, useState } from "react";

import api from "@/src/lib/api";

import LoadingButton from "../ui/LoadingButton";

import { Skill } from "../../types/skill";
import { SkillCategory } from "../../types/skillCategory";

interface EditSkillModalProps {
  open: boolean;

  onClose: () => void;

  skill: Skill | null;

  skillCategories: SkillCategory[];

  setSkills: React.Dispatch<
    React.SetStateAction<Skill[]>
  >;
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

  const [displayOrder,setDisplayOrder] = useState(1);

  const [featured,setFeatured] = useState(false);

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");

  useEffect(() => {

    if (!skill) return;

    setName(skill.name);

    setCategoryId(
      String(skill.categoryId)
    );

    setLevel(
      skill.level ?? 80
    );

    setIcon(
      skill.icon ?? ""
    );

    setDisplayOrder(
      skill.displayOrder
    );

    setFeatured(
      skill.featured
    );

  }, [skill]);

  if (!open || !skill) {
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
          `/skills/${skill.id}`,
          {
            name,

            categoryId:
              Number(categoryId),

            level,

            icon,

            displayOrder,

            featured,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSkills((prev) =>
        prev.map((item) =>
          item.id === skill.id
            ? response.data
            : item
        )
      );

      onClose();

    } catch (error) {

      console.error(error);

      setError(
        "Failed to update skill."
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
        max-w-2xl
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
          Edit Skill
        </h2>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Skill Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
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
            <label className="block mb-2 font-medium">
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

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Skill Level
              </label>

              <input
                type="number"
                min={0}
                max={100}
                value={level}
                onChange={(e) =>
                  setLevel(
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

            <div>
              <label className="block mb-2 font-medium">
                Display Order
              </label>

              <input
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(
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

          </div>

          <div>
            <label className="block mb-2 font-medium">
              Icon Name
            </label>

            <input
              type="text"
              value={icon}
              onChange={(e) =>
                setIcon(
                  e.target.value
                )
              }
              placeholder="python"
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
              "
            />

            <label className="font-medium">
              Featured Skill
            </label>
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