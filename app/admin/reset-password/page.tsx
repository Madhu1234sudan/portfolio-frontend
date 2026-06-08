"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ArrowLeft } from "lucide-react";

import api from "@/src/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
 

 const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  if (
  typeof window !== "undefined" &&
  !token
) {
  const params = new URLSearchParams(
    window.location.search
  );

  const urlToken =
    params.get("token") || "";

  if (urlToken) {
    setToken(urlToken);
  }
}
  

  const handleReset = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/reset-password",
        {
          token,
          newPassword,
        }
      );

      setMessage(response.data.message);
      setError("");

    } catch {
      setError(
        "Invalid or expired reset token"
      );

      setMessage("");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-zinc-100 via-white to-green-50 dark:from-black dark:via-zinc-950 dark:to-black">

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 shadow-2xl">

        <button
          onClick={() =>
            router.push("/admin/login")
          }
          className="flex items-center gap-2 text-zinc-500 hover:text-green-500 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <KeyRound
          size={48}
          className="text-green-500 mb-6"
        />

        <h1 className="text-3xl font-black text-black dark:text-white mb-3">
          Reset Password
        </h1>

        <p className="text-zinc-500 mb-8">
          Enter your new password.
        </p>

        <form
          onSubmit={handleReset}
          className="space-y-6"
        >
          

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="
              w-full
              bg-zinc-50
              dark:bg-black
              border
              border-zinc-300
              dark:border-zinc-700
              rounded-xl
              px-4
              py-4
              text-black
              dark:text-white
              focus:outline-none
              focus:border-green-400
            "
          />

          {message && (
            <p className="text-green-500">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="
              w-full
              bg-green-500
              hover:bg-green-400
              py-4
              rounded-xl
              font-bold
              text-black
            "
          >
            Reset Password
          </button>
        </form>

      </div>
    </main>
  );
}