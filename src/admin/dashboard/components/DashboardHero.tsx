"use client";

import AdminCard from "@/src/common/AdminCard";
import AdminSectionHeader from "@/src/common/AdminSectionHeader";
import { PrimaryButton } from "@/src/buttons/PrimaryButton";
import { SecondaryButton } from "@/src/buttons/SecondaryButton";

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