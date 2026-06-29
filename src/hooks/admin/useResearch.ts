"use client";

import { useCallback, useState, } from "react";

import api from "@/src/lib/api";

import { Research } from "@/src/types/research";

export default function useResearch() {
  const [research, setResearch] =
    useState<Research[]>([]);

  const [loading, setLoading] =
    useState(false);

  const refreshResearch = useCallback(
  async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/research");

      setResearch(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  },
  []
);

  return {
    research,
    setResearch,
    loading,
    refreshResearch,
  };
}