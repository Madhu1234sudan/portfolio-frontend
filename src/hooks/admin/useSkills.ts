"use client";

import { useCallback, useState, } from "react";

import api from "@/src/lib/api";

import { Skill } from "@/src/types/skill";

export default function useSkills() {
  const [skills, setSkills] =
    useState<Skill[]>([]);

  const [loading, setLoading] =
    useState(false);

  const refreshSkills = useCallback(
  async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/skills");

      setSkills(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  },
  []
);

  return {
    skills,
    setSkills,
    loading,
    refreshSkills,
  };
}