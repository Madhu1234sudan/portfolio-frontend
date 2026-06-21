"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-[var(--radius-lg)]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          shadow-2xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--border)]
            px-6
            py-4
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-[var(--foreground)]
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              transition-colors
              hover:bg-[var(--surface-hover)]
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}