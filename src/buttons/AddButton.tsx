"use client";

import LoadingButton from "../ui/LoadingButton";

interface AddButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function AddButton({
  children,
  loading = false,
  onClick,
  type = "button",
}: AddButtonProps) {
  return (
    <div className="pt-2">
      <LoadingButton
        type={type}
        loading={loading}
        onClick={onClick}
        className="
          inline-flex
          w-auto
          min-w-[170px]
          justify-center
          bg-[var(--primary)]
          hover:bg-[var(--primary-hover)]
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
        "
      >
        {children}
      </LoadingButton>
    </div>
  );
}