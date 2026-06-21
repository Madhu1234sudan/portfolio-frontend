"use client";

import AdminCard from "../common/AdminCard";
import AdminSectionHeader from "../common/AdminSectionHeader";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";

interface DashboardHeroProps {
  onAddProject: () => void;
  onViewProjects: () => void;
}

export default function DashboardHero({
  onAddProject,
  onViewProjects,
}: DashboardHeroProps) {
  return (
    <AdminCard>
      <AdminSectionHeader
        title="Dashboard Overview"
        subtitle="Welcome to your AI Portfolio Admin Dashboard."
        rightContent={
          <div className="flex gap-3">
            <PrimaryButton onClick={onAddProject}>
              + Add New Project
            </PrimaryButton>

            <SecondaryButton onClick={onViewProjects}>
              View Projects
            </SecondaryButton>
          </div>
        }
      />
    </AdminCard>
  );
}