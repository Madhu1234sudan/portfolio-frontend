"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface SecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        h-11
        px-5
        rounded-lg
        border
        font-medium
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        border-[var(--border)]
        bg-[var(--surface)]
        hover:bg-[var(--surface-hover)]
        ${className}
      `}
    >
      {children}
    </button>
  );
}