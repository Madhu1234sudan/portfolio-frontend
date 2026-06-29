"use client";

import  AdminCard  from "@/src/common/AdminCard";
import { StatusBadge } from "@/src/common/StatusBadge";

interface Project {
  id: number;
  title: string;
  techStack: string[];
  featured: boolean;
}

interface RecentProjectsProps {
  projects: Project[];
  onViewProjects: () => void;
}

export default function RecentProjects({
  projects,
  onViewProjects,
}: RecentProjectsProps) {
  return (
    <AdminCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-black dark:text-white">
          Recent Projects
        </h3>

        <span className="text-zinc-500 dark:text-zinc-400 text-sm">
          {projects.length} Project(s)
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            No projects found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              onClick={onViewProjects}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-zinc-200
                dark:border-zinc-800
                bg-zinc-50
                dark:bg-zinc-950
                p-5
                transition-all
                duration-300
                hover:border-emerald-500
                hover:shadow-lg
                cursor-pointer
              "
            >
              <div>
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  {project.title}
                </h4>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {project.techStack.join(", ")}
                </p>
              </div>

              <StatusBadge
  variant={project.featured ? "success" : "neutral"}
>
  {project.featured ? "Featured" : "Regular"}
</StatusBadge>
            </div>
          ))}
        </div>
      )}
    </AdminCard>
  );
}