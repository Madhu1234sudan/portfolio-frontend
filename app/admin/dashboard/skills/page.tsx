"use client";

import { useEffect, useState } from "react";

import SkillsSection from "@/src/admin/dashboard/sections/SkillsSection";

import useSkills from "@/src/hooks/admin/useSkills";
import useSkillCategories from "@/src/hooks/admin/useSkillCategories";

import { Skill } from "@/src/types/skill";
import { SkillCategory } from "@/src/types/skillCategory";

export default function SkillsPage() {
  const {
    skills,
    setSkills,
    refreshSkills,
  } = useSkills();

  const {
    skillCategories,
    setSkillCategories,
    refreshSkillCategories,
  } = useSkillCategories();

  const [editingCategory, setEditingCategory] =
    useState<SkillCategory | null>(null);

  const [editCategoryOpen, setEditCategoryOpen] =
    useState(false);

  const [editingSkill, setEditingSkill] =
    useState<Skill | null>(null);

  const [editSkillOpen, setEditSkillOpen] =
    useState(false);

  useEffect(() => {
    refreshSkills();
    refreshSkillCategories();
  }, [
    refreshSkills,
    refreshSkillCategories,
  ]);

  return (
    <SkillsSection
      skillCategories={skillCategories}
      setSkillCategories={setSkillCategories}
      refreshSkillCategories={refreshSkillCategories}

      skills={skills}
      setSkills={setSkills}

      editingCategory={editingCategory}
      setEditingCategory={setEditingCategory}

      editCategoryOpen={editCategoryOpen}
      setEditCategoryOpen={setEditCategoryOpen}

      editingSkill={editingSkill}
      setEditingSkill={setEditingSkill}

      editSkillOpen={editSkillOpen}
      setEditSkillOpen={setEditSkillOpen}
    />
  );
}