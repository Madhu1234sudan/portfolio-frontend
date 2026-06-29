"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
      <Link
        href="/admin/dashboard"
        className="hover:text-black dark:hover:text-white transition-colors"
      >
        Dashboard
      </Link>

      {segments.slice(2).map((segment, index) => {
        const href =
          "/" +
          segments.slice(0, index + 3).join("/");

        const label = segment
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() +
              word.slice(1)
          )
          .join(" ");

        return (
          <div
            key={href}
            className="flex items-center gap-2"
          >
            <span>/</span>

            <Link
              href={href}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}