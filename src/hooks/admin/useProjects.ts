"use client";

import {useCallback,useEffect,useState,} from "react";

import api from "@/src/lib/api";

import { Project } from "@/src/types/project";

export default function useProjects() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const refreshProjects = useCallback(
  async () => {
    try {
      const response =
        await api.get("/projects");

      setProjects(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  },
  []
);

 useEffect(() => {
  const loadProjects = async () => {
    await refreshProjects();
  };

  loadProjects();
}, [refreshProjects]);

  return {
    projects,
    setProjects,
    loading,
    refreshProjects,
  };
}