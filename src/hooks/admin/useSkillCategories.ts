"use client";

import { useCallback, useState, } from "react";

import api from "@/src/lib/api";

import { SkillCategory } from "@/src/types/skillCategory";

export default function useSkillCategories() {
  const [skillCategories, setSkillCategories] =
    useState<SkillCategory[]>([]);

  const [loading, setLoading] =
    useState(false);

  const refreshSkillCategories = useCallback(
  async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/skill-categories");

      setSkillCategories(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  },
  []
);

  return {
    skillCategories,
    setSkillCategories,
    loading,
    refreshSkillCategories,
  };
}