"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface DangerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function DangerButton({
  children,
  className = "",
  ...props
}: DangerButtonProps) {
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
        font-medium
        text-white
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        bg-[var(--danger)]
        hover:opacity-90
        ${className}
      `}
    >
      {children}
    </button>
  );
}