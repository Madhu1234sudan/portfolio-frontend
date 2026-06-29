interface PageSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

import AdminCard from "./AdminCard";

export default function PageSection({
  title,
  description,
  children,
  className = "",
}: PageSectionProps) {
  return (
    <AdminCard className={className}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </AdminCard>
  );
}