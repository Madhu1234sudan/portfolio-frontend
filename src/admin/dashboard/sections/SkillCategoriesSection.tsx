"use client";

import { Dispatch, SetStateAction, useState } from "react";

import AddSkillCategoryForm from "@/src/admin/skill-categories/forms/AddSkillCategoryForm";
import SkillCategoryTable from "@/src/admin/skill-categories/components/SkillCategoryTable";
import EditSkillCategoryModal from "@/src/admin/skill-categories/modals/EditSkillCategoryModal";

import { SkillCategory } from "@/src/types/skillCategory";

type SkillCategoriesSectionProps = {
  skillCategories: SkillCategory[];
  setSkillCategories: Dispatch<
    SetStateAction<SkillCategory[]>
  >;
  refreshSkillCategories: () => Promise<void>;
};

export default function SkillCategoriesSection({
  skillCategories,
  setSkillCategories,
  refreshSkillCategories,
}: SkillCategoriesSectionProps) {

  const [editingCategory, setEditingCategory] =
    useState<SkillCategory | null>(null);

  const [editCategoryOpen, setEditCategoryOpen] =
    useState(false);

  return (
    <div className="space-y-8">

      <AddSkillCategoryForm
  setSkillCategories={setSkillCategories}
  refreshSkillCategories={refreshSkillCategories}
/>


      <SkillCategoryTable
  skillCategories={skillCategories}
  setSkillCategories={setSkillCategories}
  refreshSkillCategories={refreshSkillCategories}
  setEditingCategory={setEditingCategory}
  setEditCategoryOpen={setEditCategoryOpen}
/>

      <EditSkillCategoryModal
  open={editCategoryOpen}
  onClose={() => {
    setEditCategoryOpen(false);
    setEditingCategory(null);
  }}
  category={editingCategory}
  setSkillCategories={setSkillCategories}
  refreshSkillCategories={refreshSkillCategories}
/>

    </div>
  );
}