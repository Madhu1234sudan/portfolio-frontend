"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";

import api from "@/src/lib/api";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      setMessage(response.data.message);
      setResetToken(response.data.resetToken);
      setError("");

    } catch (error) {
      setError("Failed to generate reset token");
      setMessage("");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-zinc-100 via-white to-green-50 dark:from-black dark:via-zinc-950 dark:to-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 shadow-2xl">

        <button
          onClick={() => router.push("/admin/login")}
          className="flex items-center gap-2 text-zinc-500 hover:text-green-500 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <Mail
          size={48}
          className="text-green-500 mb-6"
        />

        <h1 className="text-3xl font-black text-black dark:text-white mb-3">
          Forgot Password
        </h1>

        <p className="text-zinc-500 mb-8">
          Enter your admin email address.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
          {resetToken && (
  <div className="bg-zinc-100 dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-xl p-4">
    <p className="text-xs text-zinc-500 mb-2">
      Development Reset Token
    </p>

    <p className="break-all text-green-500 text-sm">
      {resetToken}
    </p>
  </div>
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
            Send Reset Request
          </button>
        </form>
      </div>
    </main>
  );
}
