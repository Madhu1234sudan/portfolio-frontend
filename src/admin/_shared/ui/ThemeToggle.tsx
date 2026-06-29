"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="
        relative
        flex
        items-center
        w-16
        h-9
        rounded-full
        border
        border-zinc-300
        dark:border-zinc-700
        bg-zinc-100
        dark:bg-zinc-900
        "
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
      relative
      flex
      items-center
      w-16
      h-9
      rounded-full
      border
      border-zinc-300
      dark:border-zinc-700
      bg-zinc-100
      dark:bg-zinc-900
      transition-all
      "
    >
      <div
        className={`
          absolute
          flex
          items-center
          justify-center
          w-7
          h-7
          rounded-full
          bg-white
          dark:bg-zinc-800
          shadow-md
          transition-all
          duration-300
          ${isDark ? "translate-x-8" : "translate-x-1"}
        `}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
