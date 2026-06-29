interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminCard({
  children,
  className = "",
}: AdminCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}