"use client";

import { Project } from "@/src/types/project";

import {
  DashboardHero,
  DashboardStatistics,
  RecentProjects,
} from "@/src/dashboard";

interface DashboardContentProps {
  projects: Project[];

  onAddProject: () => void;

  onViewProjects: () => void;
}

export default function DashboardContent({
  projects,
  onAddProject,
  onViewProjects,
}: DashboardContentProps) {

  const latestProject =
    projects.length > 0
      ? projects[0]
      : null;

  return (
    <div className="space-y-8">

      <DashboardHero
        onAddProject={onAddProject}
        onViewProjects={onViewProjects}
      />

      <DashboardStatistics
        projects={projects}
        latestProject={latestProject}
      />

      <RecentProjects
        projects={projects}
        onViewProjects={onViewProjects}
      />

    </div>
  );
}