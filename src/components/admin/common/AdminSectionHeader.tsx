"use client";

interface AdminSectionHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export default function AdminSectionHeader({
  title,
  subtitle,
  rightContent,
}: AdminSectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-black dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      {rightContent && (
        <div>
          {rightContent}
        </div>
      )}
    </div>
  );
}