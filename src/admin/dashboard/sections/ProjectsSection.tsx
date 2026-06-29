"use client";

import { Dispatch, SetStateAction } from "react";

import AddProjectForm from "@/src/admin/projects/forms/AddProjectForm";
import ProjectTable from "@/src/admin/projects/components/ProjectTable";
import PageSection from "@/src/admin/_shared/ui/PageSection";
import { Project } from "@/src/types/project";

type ProjectsSectionProps = {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
};

export default function ProjectsSection({
  projects,
  setProjects,
}: ProjectsSectionProps) {
  return (
  <div className="space-y-8">
    <PageSection
      title="Add Project"
      description="Create a new portfolio project."
    >
      <AddProjectForm
        setProjects={setProjects}
      />
    </PageSection>

    <PageSection
      title="Project Library"
      description="Browse, search, edit, and manage your portfolio projects."
    >
      <ProjectTable
        projects={projects}
        setProjects={setProjects}
      />
    </PageSection>
  </div>
);
}