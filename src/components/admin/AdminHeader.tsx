"use client";

import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  sidebarOpen: boolean;

  setSidebarOpen:
    React.Dispatch<
      React.SetStateAction<boolean>
      >;
}
export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem(
      "adminToken"
    );

    router.push("/admin/login");
  };

  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950">

      <div className="flex items-center gap-6">

 <button
  onClick={() =>
    setSidebarOpen(!sidebarOpen)
  }
  className="relative z-[60] ml-2 bg-zinc-900 hover:bg-zinc-800 transition-all p-3 rounded-xl border border-zinc-700 text-white"
>
    ☰
  </button>

  <div>

    <h1 className="text-3xl font-bold text-white">
      AI Portfolio Admin
    </h1>

    <p className="text-zinc-400 mt-1">
      Manage your Data Science projects
    </p>

  </div>

</div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-400 transition-all px-5 py-2 rounded-xl text-white font-medium"
      >
        Logout
      </button>

    </header>
  );
}