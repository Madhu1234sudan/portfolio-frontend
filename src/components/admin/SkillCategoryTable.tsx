"use client";

import api from "@/src/lib/api";

import { SkillCategory } from "../../types/skillCategory";

interface SkillCategoryTableProps {
  skillCategories: SkillCategory[];

  setSkillCategories:
    React.Dispatch<
      React.SetStateAction<
        SkillCategory[]
      >
    >;

  setEditingCategory:
    React.Dispatch<
      React.SetStateAction<
        SkillCategory | null
      >
    >;

  setEditCategoryOpen:
    React.Dispatch<
      React.SetStateAction<boolean>
    >;
}
export default function SkillCategoryTable({
  skillCategories,
  setSkillCategories,
  setEditingCategory,
  setEditCategoryOpen,
}: SkillCategoryTableProps)  {

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Delete this category?"
      );

    if (!confirmed) return;

    try {
      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      await api.delete(
        `/skill-categories/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSkillCategories((prev) =>
        prev.filter(
          (category) =>
            category.id !== id
        )
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete category."
      );
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
          {skillCategories.length}
          {" "}
          Categories
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

              {skillCategories.map(
                (category) => (
                  <tr
                    key={category.id}
                    className="
                    border-b
                    border-zinc-200
                    dark:border-zinc-800
                    "
                  >
                    <td className="p-5">
                      {category.title}
                    </td>

                    <td className="p-5">
                      {category.order}
                    </td>

                    <td className="p-5">
                      {
                        category.skills
                          ?.length
                      }
                    </td>

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
                          onClick={() =>
                            handleDelete(
                              category.id
                            )
                          }
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
                )
              )}

            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}