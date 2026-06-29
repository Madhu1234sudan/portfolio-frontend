"use client";

import { useEffect } from "react";

import useProjects from "@/src/hooks/admin/useProjects";

import AnalyticsSection from "@/src/admin/dashboard/sections/AnalyticsSection";

export default function AnalyticsPage() {
  const {
    projects,
    refreshProjects,
  } = useProjects();

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return (
    <AnalyticsSection
      projects={projects}
    />
  );
}