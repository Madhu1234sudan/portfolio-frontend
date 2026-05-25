"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem(
      "adminToken"
    );

    router.push("/admin/login");
  };

  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950">

      <div>
        <h1 className="text-3xl font-bold text-white">
          AI Portfolio Admin
        </h1>

        <p className="text-zinc-400 mt-1">
          Manage your Data Science projects
        </p>
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