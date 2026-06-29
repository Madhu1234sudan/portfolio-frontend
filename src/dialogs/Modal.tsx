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
    overflow-y-auto
    bg-black/50
    p-6
  "
>
  <div
    className="
      min-h-full
      flex
      items-start
      justify-center
      py-10
    "
  >
      <div
  className="
    w-full
    max-w-4xl
    rounded-2xl
    bg-[var(--surface)]
    border
    border-[var(--border)]
    shadow-2xl
    max-h-[90vh]
    overflow-hidden
  "
>
        <div
  className="
    sticky
    top-0
    z-10
    flex
    items-center
    justify-between
    border-b
    border-[var(--border)]
    bg-[var(--surface)]
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

        <div
  className="
    p-6
    overflow-y-auto
    max-h-[calc(90vh-72px)]
  "
>
          {children}
        </div>
      </div>
    </div>
    </div>
  );
}