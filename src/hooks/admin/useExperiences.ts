"use client";

import { useCallback, useState } from "react";

import api from "@/src/lib/api";

import { Experience } from "@/src/types/experience";

export default function useExperiences() {
  const [experiences, setExperiences] =
    useState<Experience[]>([]);

  const [loading, setLoading] =
    useState(false);

  const refreshExperiences = useCallback(
  async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/experience");

      setExperiences(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  },
  []
);

  return {
    experiences,
    setExperiences,
    loading,
    refreshExperiences,
  };
}