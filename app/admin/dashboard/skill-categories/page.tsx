"use client";

import { useEffect } from "react";

import useSkillCategories from "@/src/hooks/admin/useSkillCategories";

import SkillCategoriesSection from "@/src/admin/dashboard/sections/SkillCategoriesSection";

export default function SkillCategoriesPage() {
  const {
    skillCategories,
    setSkillCategories,
    refreshSkillCategories,
  } = useSkillCategories();

  useEffect(() => {
    refreshSkillCategories();
  }, [refreshSkillCategories]);

  return (
    <SkillCategoriesSection
      skillCategories={skillCategories}
      setSkillCategories={setSkillCategories}
      refreshSkillCategories={refreshSkillCategories}
    />
  );
}