"use client";

import { useEffect } from "react";

import useProjects from "@/src/hooks/admin/useProjects";
import ProjectsSection from "@/src/admin/dashboard/sections/ProjectsSection";
import AdminPageLayout from "@/src/admin/_shared/layout/AdminPageLayout";
import PageHeader from "@/src/admin/_shared/layout/PageHeader";
export default function ProjectsPage() {
  const {
    projects,
    setProjects,
    refreshProjects,
  } = useProjects();

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return (
  <AdminPageLayout>
    <PageHeader
      title="Projects"
      description="Manage your portfolio projects."
    />

    <ProjectsSection
      projects={projects}
      setProjects={setProjects}
    />
  </AdminPageLayout>
);
}