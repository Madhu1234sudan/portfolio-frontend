"use client";

interface LoadingButtonProps {
  children: React.ReactNode;
  loading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function LoadingButton({
  loading,
  disabled = false,
  children,
  type = "button",
  onClick,
  className = "",
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        w-full
        h-11

        px-5

        rounded-lg

        font-medium

        text-white

        transition-all
        duration-200

        bg-[var(--primary)]
        hover:bg-[var(--primary-hover)]

        disabled:opacity-60
        disabled:cursor-not-allowed

        ${className}
      `}
    >
      {loading ? (
        <>
          <span
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-white
              border-t-transparent
            "
          />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}