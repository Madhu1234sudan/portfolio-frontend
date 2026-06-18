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
  ${className}
  ${
    disabled || loading
      ? "opacity-60 cursor-not-allowed"
      : ""
  }
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