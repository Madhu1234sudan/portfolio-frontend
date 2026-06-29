"use client";

import { useEffect, useState } from "react";

import ExperienceSection from "@/src/admin/dashboard/sections/ExperienceSection";

import useExperiences from "@/src/hooks/admin/useExperiences";

import { Experience } from "@/src/types/experience";

export default function ExperiencePage() {
  const {
    experiences,
    setExperiences,
    refreshExperiences,
  } = useExperiences();

  const [editingExperience, setEditingExperience] =
    useState<Experience | null>(null);

  const [editExperienceOpen, setEditExperienceOpen] =
    useState(false);

  useEffect(() => {
    refreshExperiences();
  }, [refreshExperiences]);

  return (
    <ExperienceSection
      experiences={experiences}
      setExperiences={setExperiences}
      editingExperience={editingExperience}
      setEditingExperience={setEditingExperience}
      editExperienceOpen={editExperienceOpen}
      setEditExperienceOpen={setEditExperienceOpen}
    />
  );
}