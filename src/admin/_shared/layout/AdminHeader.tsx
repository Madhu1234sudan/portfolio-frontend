"use client";

import ThemeToggle from "@/src/admin/_shared/ui/ThemeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/src/hooks/useAuth";
import ConfirmationDialog from "@/src/dialogs/ConfirmationDialog";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
}: AdminHeaderProps) {
  const router = useRouter();

const { logout } = useAuth();

const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <>
    <header
      className="
      sticky
      top-0
      z-40
      flex
      items-center
      justify-between
      px-8
      py-5
      border-b
      border-zinc-200
      dark:border-zinc-800
      bg-white/80
      dark:bg-zinc-950/80
      backdrop-blur-xl
      transition-all
      "
    >
      <div className="flex items-center gap-6">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="
          relative
          z-[60]
          ml-2
          h-11
          w-11
          flex
          items-center
          justify-center
          rounded-xl
          border
          border-zinc-300
          dark:border-zinc-700
          bg-white
          dark:bg-zinc-900
          text-black
          dark:text-white
          hover:scale-105
          transition-all
          "
        >
          ☰
        </button>

        <div>
          <h1
            className="
            text-2xl
            font-semibold
            tracking-tight
            text-black
            dark:text-white
            "
          >
            AI Portfolio Admin
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Manage your Data Science projects
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <button
          onClick={() => setLogoutOpen(true)}
          className="
          px-5
          py-2.5
          rounded-xl
          font-medium
          border
          border-red-500/30
          bg-red-500/10
          text-red-500
          hover:bg-red-500/20
          transition-all
          "
        >
          Logout
        </button>
      </div>
    </header>
    <ConfirmationDialog
  open={logoutOpen}
  title="Logout"
  message="Are you sure you want to logout?"
  confirmText="Logout"
  onCancel={() => setLogoutOpen(false)}
  onConfirm={() => {
    logout();
    router.replace("/admin/login");
  }}
/>
    </>
  );
  
}