"use client";

import { Experience } from "@/src/types/experience";

import AddExperienceForm from "@/src/admin/experience/forms/AddExperienceForm";
import ExperienceTable from "@/src/admin/experience/components/ExperienceTable";
import EditExperienceModal from "@/src/admin/experience/modals/EditExperienceModal";

interface ExperienceSectionProps {
  experiences: Experience[];

  setExperiences: React.Dispatch<
    React.SetStateAction<Experience[]>
  >;

  editingExperience: Experience | null;

  setEditingExperience: React.Dispatch<
    React.SetStateAction<Experience | null>
  >;

  editExperienceOpen: boolean;

  setEditExperienceOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function ExperienceSection({
  experiences,
  setExperiences,

  editingExperience,
  setEditingExperience,

  editExperienceOpen,
  setEditExperienceOpen,
}: ExperienceSectionProps) {
  return (
    <>
      <div className="space-y-8">

        <AddExperienceForm
          setExperiences={setExperiences}
        />

        <ExperienceTable
          experiences={experiences}
          setExperiences={setExperiences}
          setEditingExperience={setEditingExperience}
          setEditExperienceOpen={setEditExperienceOpen}
        />

      </div>

      <EditExperienceModal
        open={editExperienceOpen}
        onClose={() => {
          setEditExperienceOpen(false);
          setEditingExperience(null);
        }}
        experience={editingExperience}
        setExperiences={setExperiences}
      />
    </>
  );
}