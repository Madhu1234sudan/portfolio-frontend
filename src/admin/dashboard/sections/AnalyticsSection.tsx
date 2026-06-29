"use client";

import { Project } from "@/src/types/project";

interface AnalyticsSectionProps {
  projects: Project[];
}

export default function AnalyticsSection({
  projects,
}: AnalyticsSectionProps) {

  const featuredProjects =
    projects.filter(
      (project) => project.featured
    );

  const regularProjects =
    projects.filter(
      (project) => !project.featured
    );

  const featuredRatio =
    projects.length > 0
      ? Math.round(
          (featuredProjects.length /
            projects.length) *
            100
        )
      : 0;

  const techCounts: Record<
    string,
    number
  > = {};

  projects.forEach((project) => {
    project.techStack.forEach((tech) => {
      techCounts[tech] =
        (techCounts[tech] || 0) + 1;
    });
  });

  const mostUsedTech =
    Object.keys(techCounts).length > 0
      ? Object.entries(techCounts)
          .sort((a, b) => b[1] - a[1])[0][0]
      : "None";

  const latestProject =
    projects.length > 0
      ? projects[0]
      : null;

  return (
    <div className="space-y-8">

      <div
        className="
        bg-white
        dark:bg-zinc-900
        border
        border-zinc-300
        dark:border-zinc-800
        rounded-2xl
        p-6
        "
      >
        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
          Analytics Dashboard
        </h2>

        <p className="text-zinc-400">
          Real-time portfolio statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-500 text-sm">
            Total Projects
          </h3>

          <p className="text-4xl font-bold text-black dark:text-white mt-3">
            {projects.length}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-500 text-sm">
            Featured Projects
          </h3>

          <p className="text-4xl font-bold text-green-500 mt-3">
            {featuredProjects.length}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-500 text-sm">
            Regular Projects
          </h3>

          <p className="text-4xl font-bold text-black dark:text-white mt-3">
            {regularProjects.length}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-500 text-sm">
            Most Used Technology
          </h3>

          <p className="text-2xl font-bold text-blue-500 mt-3">
            {mostUsedTech}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-500 text-sm">
            Featured Ratio
          </h3>

          <p className="text-4xl font-bold text-purple-500 mt-3">
            {featuredRatio}%
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="text-zinc-500 text-sm">
            Last Created Project
          </h3>

          <p className="text-xl font-bold text-black dark:text-white mt-3">
            {latestProject
              ? latestProject.title
              : "None"}
          </p>
        </div>

      </div>

    </div>
  );
}