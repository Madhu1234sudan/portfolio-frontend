"use client";

import api from "@/src/lib/api";
import { Skill } from "@/src/types/skill";
import { useState } from "react";
import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import SearchBar from "@/src/common/SearchBar";
import { StatusBadge } from "@/src/common/StatusBadge";
import ConfirmationDialog from "@/src/dialogs/ConfirmationDialog";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";
import { DangerButton } from "@/src/buttons/DangerButton";
import EmptyState from "@/src/common/EmptyState";
interface SkillTableProps {
  skills: Skill[];

  refreshSkillCategories: () => Promise<void>;

  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;

  setEditingSkill: React.Dispatch<React.SetStateAction<Skill | null>>;

  setEditSkillOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SkillTable({
  skills,
  setSkills,
  refreshSkillCategories,
  setEditingSkill,
  setEditSkillOpen,
}: SkillTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteSkillId, setDeleteSkillId] = useState<number | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  console.log(skills);
  const confirmDelete = async (id: number) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      await api.delete(`/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      await refreshSkillCategories();
    } catch (error) {
      console.error(error);

      alert("Failed to delete skill.");
    }
  };
  const filteredSkills = skills.filter((skill) => {
    const query = searchTerm.toLowerCase();

    return (
      skill.name.toLowerCase().includes(query) ||
      skill.category.title.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-8">
      <AdminSectionHeader
        title="Skills"
        subtitle={`${filteredSkills.length} Skill(s)`}
      />
      <AdminCard className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search skills..."
          className="max-w-md"
        />
      </AdminCard>
      {skills.length === 0 ? (
        <EmptyState
          title="No Skills Found"
          description="Add your first skill to display it here."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-300 dark:border-zinc-700">
                <th className="p-4 text-left">Skill</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-center">Level</th>

                <th className="p-4 text-center">Featured</th>

                <th className="p-4 text-center">Display Order</th>

                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSkills.map((skill) => (
                <tr
                  key={skill.id}
                  className="
                      border-b
                      border-zinc-200
                      dark:border-zinc-800
                      "
                >
                  <td className="p-4">{skill.name}</td>

                  <td className="p-4">{skill.category.title}</td>

                  <td className="p-4 text-center">{skill.level ?? "-"}%</td>

                  <td className="p-4 text-center">
                    {skill.featured ? (
                      <StatusBadge variant="success">Featured</StatusBadge>
                    ) : (
                      <StatusBadge>Regular</StatusBadge>
                    )}
                  </td>

                  <td className="p-4 text-center">{skill.order}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <SecondaryButton
                        onClick={() => {
                          setEditingSkill(skill);
                          setEditSkillOpen(true);
                        }}
                      >
                        Edit
                      </SecondaryButton>

                      <DangerButton onClick={() => setDeleteSkillId(skill.id)}>
                        Delete
                      </DangerButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmationDialog
        open={deleteSkillId !== null}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
        loading={isDeleting}
        onCancel={() => setDeleteSkillId(null)}
        onConfirm={async () => {
          if (deleteSkillId === null) return;

          setIsDeleting(true);

          try {
            await confirmDelete(deleteSkillId);
            setDeleteSkillId(null);
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </div>
  );
}
