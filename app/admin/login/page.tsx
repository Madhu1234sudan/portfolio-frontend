"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "../../../src/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      sessionStorage.setItem(
        "adminToken",
        response.data.token
      );

      router.push("/admin");

    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin Login
          </h1>

          <p className="text-gray-500">
            Secure AI Portfolio Access
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>
            <label className="block text-gray-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            />
          </div>

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 transition-all py-3 rounded-xl text-black font-semibold"
          >
            Login
          </button>

        </form>
      </div>

    </main>
  );
}