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
  "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",

neutral:
  "bg-[var(--surface-hover)] text-[var(--text-muted)] border border-[var(--border)]",
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