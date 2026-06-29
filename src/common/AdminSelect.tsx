"use client";

import { ReactNode } from "react";

interface AdminSelectProps {
  label: string;

  value: string | number;

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  children: ReactNode;

  disabled?: boolean;
}

export default function AdminSelect({
  label,
  value,
  onChange,
  children,
  disabled = false,
}: AdminSelectProps) {
  return (
    <div>
      <label
        className="
        block
        mb-2
        font-medium
        text-black
        dark:text-white
        "
      >
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="
        w-full
        rounded-xl
        border
        border-zinc-300
        dark:border-zinc-700
        bg-zinc-100
        dark:bg-black
        px-4
        py-3
        outline-none
        transition-all
        focus:border-[var(--primary)]
        disabled:opacity-60
        "
      >
        {children}
      </select>
    </div>
  );
}