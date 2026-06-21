"use client";

import { ChangeEvent } from "react";

interface AdminTextareaProps {
  label: string;
  value: string | null;

  onChange: (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => void;

  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export default function AdminTextarea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  disabled = false,
  className = "",
}: AdminTextareaProps) {
  return (
    <div className="space-y-2">
      <label
        className="
          block
          text-sm
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}
      </label>

      <textarea
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full
          rounded-[var(--radius-md)]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          px-4
          py-3
          text-[var(--foreground)]
          placeholder:text-[var(--text-muted)]
          outline-none
          transition-all
          duration-200
          focus:border-[var(--primary)]
          focus:ring-2
          focus:ring-[var(--primary)]/10
          resize-none
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${className}
        `}
      />
    </div>
  );
}