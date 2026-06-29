"use client";

import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyState?: ReactNode;
}

export default function AdminTable<T>({
  columns,
  data,
  emptyState,
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <>
        {emptyState}
      </>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-[var(--radius-lg)]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-card)]
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead
            className="
              border-b
              border-[var(--border)]
              bg-[var(--surface-hover)]
            "
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className={`
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-[var(--foreground)]
                    ${column.className ?? ""}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="
                  border-b
                  border-[var(--border)]
                  last:border-none
                  transition-colors
                  hover:bg-[var(--surface-hover)]
                "
              >
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className="
                      px-6
                      py-4
                      text-sm
                      text-[var(--foreground)]
                    "
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(row)
                      : (row[column.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}