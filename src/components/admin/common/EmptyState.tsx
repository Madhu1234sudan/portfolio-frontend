"use client";

import { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[var(--radius-lg)]
        border
        border-dashed
        border-[var(--border)]
        bg-[var(--surface)]
        px-8
        py-16
        text-center
      "
    >
      <div className="mb-5 text-[var(--text-muted)]">
        {icon ?? <Inbox size={52} />}
      </div>

      <h3
        className="
          text-xl
          font-semibold
          text-[var(--foreground)]
        "
      >
        {title}
      </h3>

      {description && (
        <p
          className="
            mt-2
            max-w-md
            text-sm
            text-[var(--text-muted)]
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}