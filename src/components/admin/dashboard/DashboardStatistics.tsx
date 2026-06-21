"use client";

import StatisticCard from "./StatisticCard";
import { Project } from "@/src/types/project";

interface DashboardStatisticsProps {
  projects: Project[];
  latestProject: Project | null;
}

export default function DashboardStatistics({
  projects,
  latestProject,
}: DashboardStatisticsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      <StatisticCard
        title="Total Projects"
        value={
          <p className="text-4xl font-bold text-black dark:text-white">
            {projects.length}
          </p>
        }
      />

      <StatisticCard
        title="Featured Projects"
        value={
          <p className="text-4xl font-bold text-black dark:text-white">
            {projects.filter((project) => project.featured).length}
          </p>
        }
      />

      <StatisticCard
        title="Admin Status"
        value={
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            Online
          </p>
        }
      />

      <StatisticCard
        title="Portfolio Status"
        value={
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            Active
          </p>
        }
      />

      <StatisticCard
        title="Last Created Project"
        value={
          <p className="text-xl font-bold text-black dark:text-white">
            {latestProject ? latestProject.title : "None"}
          </p>
        }
      />
    </div>
  );
}