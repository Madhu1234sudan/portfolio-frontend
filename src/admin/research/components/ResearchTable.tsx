"use client"

import { useState } from "react";
import EditResearchModal from "@/src/admin/research/modals/EditResearchModal";
import api from "@/src/lib/api";
import { Research } from "@/src/types/research";
import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import SearchBar from "@/src/common/SearchBar";
import EmptyState from "@/src/common/EmptyState";
import ConfirmationDialog from "@/src/dialogs/ConfirmationDialog";
import { StatusBadge } from "@/src/common/StatusBadge";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";
import { DangerButton } from "@/src/buttons/DangerButton";
interface ResearchTableProps {
  research: Research[];

  setResearch: React.Dispatch<React.SetStateAction<Research[]>>;
}

export default function ResearchTable({
  research,
  setResearch,
}: ResearchTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteResearchId, setDeleteResearchId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const filteredResearch = research.filter(
    (research) =>
      research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      research.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const [selectedResearch, setSelectedResearch] = useState<Research | null>(
    null,
  );

  const confirmDelete = async (id: number) => {
    try {
      const token = sessionStorage.getItem("adminToken");
      console.log(token);
      await api.delete(`/research/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResearch((prev: Research[]) =>
        prev.filter((research) => research.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminCard>
      <div className="mb-6">
        <AdminSectionHeader
          title="Research"
          subtitle={`${filteredResearch.length} Research Paper(s)`}
        />

        <AdminCard className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search research..."
            className="max-w-md"
          />
        </AdminCard>
      </div>
      <div
        className="
  bg-white
  dark:bg-zinc-900
  border
  border-zinc-300
  dark:border-zinc-800
  rounded-2xl
  overflow-hidden
  shadow-sm
"
      >
        {filteredResearch.length === 0 ? (
          <EmptyState
            title="No Research Found"
            description="Add your first research item to display it here."
          />
        ) : (
          <table className="w-full">
            <thead className="bg-zinc-100 dark:bg-black">
              <tr>
                <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                  Image
                </th>

                <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                  Title
                </th>

                <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                  Tags
                </th>

                <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                  Featured
                </th>

                <th className="text-left p-5 text-zinc-600 dark:text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredResearch.map((research: Research) => (
                <tr
                  key={research.id}
                  className="border-t border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all"
                >
                  <td className="p-5 text-black dark:text-white font-medium">
                    {research.title}
                  </td>

                  <td className="p-5 text-zinc-600 dark:text-zinc-400">
                    {research.tags.join(", ")}
                  </td>

                  <td className="p-5">
                    {research.featured ? (
                      <StatusBadge variant="success">Featured</StatusBadge>
                    ) : (
                      <StatusBadge>Regular</StatusBadge>
                    )}
                  </td>

                  <td className="p-5 flex gap-3">
                    <SecondaryButton
                      onClick={() => setSelectedResearch(research)}
                    >
                      Edit
                    </SecondaryButton>

                    <DangerButton
                      onClick={() => setDeleteResearchId(research.id)}
                    >
                      Delete
                    </DangerButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedResearch && (
        <EditResearchModal
          research={selectedResearch}
          onClose={() => setSelectedResearch(null)}
          onUpdate={(updatedResearch) =>
            setResearch((prev) =>
              prev.map((research) =>
                research.id === updatedResearch.id ? updatedResearch : research,
              ),
            )
          }
        />
      )}
      <ConfirmationDialog
        open={deleteResearchId !== null}
        title="Delete Research"
        message="Are you sure you want to delete this research? This action cannot be undone."
        loading={isDeleting}
        onCancel={() => setDeleteResearchId(null)}
        onConfirm={async () => {
          if (deleteResearchId === null) return;

          setIsDeleting(true);

          try {
            await confirmDelete(deleteResearchId);
            setDeleteResearchId(null);
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </AdminCard>
  );
}
