"use client";

import api from "@/src/lib/api";

import { Skill } from "../../types/skill";

interface SkillTableProps {
  skills: Skill[];

  setSkills: React.Dispatch<
    React.SetStateAction<Skill[]>
  >;

  setEditingSkill: React.Dispatch<
    React.SetStateAction<Skill | null>
  >;

  setEditSkillOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function SkillTable({
  skills,
  setSkills,
  setEditingSkill,
  setEditSkillOpen,
}: SkillTableProps) {
    console.log(skills);
  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Delete this skill?"
      );

    if (!confirmed) return;

    try {
      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      await api.delete(
        `/skills/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSkills((prev) =>
        prev.filter(
          (skill) =>
            skill.id !== id
        )
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete skill."
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
          "
        >
          Skills
        </h2>

        <span
          className="
          text-sm
          text-zinc-500
          "
        >
          {skills.length}
          {" "}
          Skills
        </span>

      </div>

      {skills.length === 0 ? (
        <div
          className="
          text-center
          py-12
          text-zinc-500
          "
        >
          No skills found.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
  <tr
    className="
    border-b
    border-zinc-300
    dark:border-zinc-700
    "
  >
    <th className="p-4 text-left">Skill</th>

    <th className="p-4 text-left">Category</th>

    <th className="p-4 text-center">Level</th>

    <th className="p-4 text-center">Featured</th>

    <th className="p-4 text-center">Display Order</th>

    <th className="p-4 text-center">Actions</th>
  </tr>
</thead>

            <tbody>

              {skills.map(
                (skill) => (
                  <tr
                      key={skill.id}
                      className="
                      border-b
                      border-zinc-200
                      dark:border-zinc-800
                      "
                    >
                      <td className="p-4">
                        {skill.name}
                      </td>

                      <td className="p-4">
                        {skill.category.title}
                      </td>

                      <td className="p-4 text-center">
                        {skill.level ?? "-"}%
                      </td>

                      <td className="p-4 text-center">
                        {skill.featured ? "⭐" : "—"}
                      </td>

                      <td className="p-4 text-center">
                        {skill.displayOrder}
                      </td>

  
                    <td className="p-4">
  <div className="flex justify-center gap-3">

    <button
  onClick={() => {
    setEditingSkill(skill);

    setEditSkillOpen(true);
  }}
  className="
  px-3
  py-2
  rounded-lg
  bg-blue-500
  hover:bg-blue-600
  text-white
  "
>
  Edit
</button>

    <button
      onClick={() => handleDelete(skill.id)}
      className="
      px-3
      py-2
      rounded-lg
      bg-red-500
      hover:bg-red-600
      text-white
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