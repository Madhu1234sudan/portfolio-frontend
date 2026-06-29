"use client";

import { useState } from "react";

import api from "@/src/lib/api";

import { Experience } from "@/src/types/experience";
import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import SearchBar from "@/src/common/SearchBar";
import EmptyState from "@/src/common/EmptyState";

import ConfirmationDialog from "@/src/dialogs/ConfirmationDialog";

import { SecondaryButton } from "@/src/buttons/SecondaryButton";
import { DangerButton } from "@/src/buttons/DangerButton";

interface ExperienceTableProps {
  experiences: Experience[];

  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;

  setEditingExperience: React.Dispatch<React.SetStateAction<Experience | null>>;

  setEditExperienceOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ExperienceTable({
  experiences,
  setExperiences,
  setEditingExperience,
  setEditExperienceOpen,
}: ExperienceTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteExperienceId, setDeleteExperienceId] = useState<number | null>(
    null,
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const filteredExperiences = experiences.filter(
    (experience) =>
      experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (experience.location || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const confirmDelete = async (id: number) => {
    try {
      const token = sessionStorage.getItem("adminToken");

      await api.delete(`/experience/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExperiences((prev) =>
        prev.filter((experience) => experience.id !== id),
      );
    } catch (error) {
      console.error(error);

      alert("Failed to delete experience.");
    }
  };
  return (
    <AdminCard>
      <div className="mb-6">
        <div className="relative w-96">
          <AdminSectionHeader
            title="Experience"
            subtitle={`${filteredExperiences.length} Record(s)`}
          />
          <AdminCard className="mb-6">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search experience..."
              className="max-w-md"
            />
          </AdminCard>
        </div>
      </div>

      <div
        className="
      overflow-hidden
      rounded-2xl
      border
      border-zinc-300
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      shadow-sm
      "
      >
        <table className="w-full min-w-[1000px]">
          <thead
            className="
          bg-zinc-100
          dark:bg-black
          "
          >
            <tr>
              <th className="p-5 text-left">Logo</th>

              <th className="p-5 text-left">Company</th>

              <th className="p-5 text-left">Position</th>

              <th className="p-5 text-left">Location</th>

              <th className="p-5 text-left">Duration</th>

              <th className="p-5 text-center">Display Order</th>

              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExperiences.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8">
                  <EmptyState
                    title="No Experience Found"
                    description="Add your first experience record to display it here."
                  />
                </td>
              </tr>
            ) : (
              filteredExperiences.map((experience) => (
                <tr
                  key={experience.id}
                  className="
                  border-t
                  border-zinc-300
                  dark:border-zinc-800
                  hover:bg-zinc-50
                  dark:hover:bg-zinc-800/30
                  transition-all
                  "
                >
                  <td className="p-5">
                    {experience.companyLogo ? (
                      <img
                        src={experience.companyLogo}
                        alt={experience.company}
                        className="
                        h-14
                        w-14
                        rounded-xl
                        object-contain
                        p-2
                      bg-white
                        border
                        border-zinc-300
                        dark:border-zinc-700
                        "
                      />
                    ) : (
                      <div
                        className="
                        h-14
                        w-14
                        rounded-xl
                        bg-zinc-200
                        dark:bg-zinc-800
                        flex
                        items-center
                        justify-center
                        text-xs
                        text-zinc-500
                        "
                      >
                        Logo
                      </div>
                    )}
                  </td>

                  <td className="p-5 font-medium">{experience.company}</td>

                  <td className="p-5">{experience.position}</td>

                  <td className="p-5">{experience.location || "-"}</td>

                  

                  <td className="p-5">
                    {new Date(experience.startDate).toLocaleDateString(
                      "en-IN",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}

                    {" - "}

                    {experience.currentlyWorking
                      ? "Present"
                      : experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                  </td>
                  <td className="p-5 text-center">{experience.displayOrder}</td>
                  <td className="p-5">
                    <div
                      className="
                      flex
                      justify-center
                      gap-3
                      "
                    >
                      <SecondaryButton
                        onClick={() => {
                          setEditingExperience(experience);
                          setEditExperienceOpen(true);
                        }}
                      >
                        Edit
                      </SecondaryButton>

                      <DangerButton
                        onClick={() => setDeleteExperienceId(experience.id)}
                      >
                        Delete
                      </DangerButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ConfirmationDialog
        open={deleteExperienceId !== null}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? This action cannot be undone."
        loading={isDeleting}
        onCancel={() => setDeleteExperienceId(null)}
        onConfirm={async () => {
          if (deleteExperienceId === null) return;

          setIsDeleting(true);

          try {
            await confirmDelete(deleteExperienceId);
            setDeleteExperienceId(null);
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </AdminCard>
  );
}
