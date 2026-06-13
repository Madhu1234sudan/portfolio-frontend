"use client";

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export default function LoadingButton({
  loading,
  children,
  type = "button",
  onClick,
  className = "",
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        ${className}
        disabled:opacity-60
        disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span
            className="
            h-4
            w-4
            animate-spin
            rounded-full
            border-2
            border-current
            border-t-transparent
            "
          />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}