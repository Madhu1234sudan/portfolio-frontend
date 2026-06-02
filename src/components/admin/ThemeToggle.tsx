"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="
        px-4
        py-2
        rounded-xl
        border
        border-zinc-700
        text-white
        hover:bg-zinc-800
        transition-all
      "
    >
      {theme === "dark"
        ? "☀️ Light"
        : "🌙 Dark"}
    </button>
  );
}