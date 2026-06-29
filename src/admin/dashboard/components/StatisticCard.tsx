"use client";

import { ReactNode } from "react";
import  AdminCard  from "@/src/common/AdminCard";

interface StatisticCardProps {
  title: string;
  value: ReactNode;
}

export default function StatisticCard({
  title,
  value,
}: StatisticCardProps) {
  return (
    <AdminCard
      className="
        hover:-translate-y-1
        hover:shadow-xl
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <h3 className="text-sm text-zinc-500 dark:text-zinc-400">
        {title}
      </h3>

      <div className="mt-3">
        {typeof value === "string" ? (
          <p className="text-2xl font-bold text-black dark:text-white">
            {value}
          </p>
        ) : (
          value
        )}
      </div>
    </AdminCard>
  );
}