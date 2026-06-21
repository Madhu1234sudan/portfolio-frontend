"use client";

import { ChangeEvent } from "react";

interface AdminInputProps {
  label: string;
  value: string | number | null;

  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;

  type?: string;

  placeholder?: string;

  disabled?: boolean;

  className?: string;
}

export default function AdminInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
}: AdminInputProps) {
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

      <input
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
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
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${className}
        `}
      />
    </div>
  );
}