"use client";

import { Skill } from "@/src/types/skill";
import { SkillCategory } from "@/src/types/skillCategory";


import AddSkillForm from "@/src/admin/skills/forms/AddSkillForm";
import SkillTable from "@/src/admin/skills/components/SkillTable";
import EditSkillModal from "@/src/admin/skills/modals/EditSkillModal";

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  setSkillCategories: React.Dispatch<
    React.SetStateAction<SkillCategory[]>
  >;
  refreshSkillCategories: () => Promise<void>;
  skills: Skill[];
  setSkills: React.Dispatch<
    React.SetStateAction<Skill[]>
  >;

  editingCategory: SkillCategory | null;
  setEditingCategory: React.Dispatch<
    React.SetStateAction<SkillCategory | null>
  >;

  editCategoryOpen: boolean;
  setEditCategoryOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  editingSkill: Skill | null;
  setEditingSkill: React.Dispatch<
    React.SetStateAction<Skill | null>
  >;

  editSkillOpen: boolean;
  setEditSkillOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function SkillsSection({
  skillCategories,
  setSkillCategories,
  refreshSkillCategories,
  skills,
  setSkills,

  editingCategory,
  setEditingCategory,

  editCategoryOpen,
  setEditCategoryOpen,

  editingSkill,
  setEditingSkill,

  editSkillOpen,
  setEditSkillOpen,
}: SkillsSectionProps) {
  return (
    <>
      <div className="space-y-8">

       

        

        <AddSkillForm
  skillCategories={skillCategories}
  setSkills={setSkills}
  refreshSkillCategories={refreshSkillCategories}
/>

        <SkillTable
  skills={skills}
  setSkills={setSkills}
  refreshSkillCategories={refreshSkillCategories}
  setEditingSkill={setEditingSkill}
  setEditSkillOpen={setEditSkillOpen}
/>

      </div>

      
      <EditSkillModal
  open={editSkillOpen}
  onClose={() => {
    setEditSkillOpen(false);
    setEditingSkill(null);
  }}
  skill={editingSkill}
  skillCategories={skillCategories}
  setSkills={setSkills}
  refreshSkillCategories={refreshSkillCategories}
/>
    </>
  );
}