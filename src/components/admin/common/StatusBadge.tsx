"use client";

import { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: "success" | "neutral";
}

export function StatusBadge({
  children,
  variant = "neutral",
}: StatusBadgeProps) {
  const styles = {
    success:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    neutral:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-sm
        font-medium
        ${styles[variant]}
      `}
    >
      {children}
    </span>
  );
}