"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import api from "../../../src/lib/api";
import LoadingButton from "@/src/components/ui/LoadingButton";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("adminToken", response.data.token);

      router.push("/admin");
    } catch (error) {
      setError("Invalid credentials");
    }
    finally {
  setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-green-50 dark:from-black dark:via-zinc-950 dark:to-black flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_60%)]" />

      <div
        className="
        relative
        z-10
        w-full
        max-w-md
        bg-white
        dark:bg-zinc-900
        backdrop-blur-xl
        border
        border-zinc-200
        dark:border-zinc-800
        rounded-3xl
        p-10
        shadow-2xl
        "
      >
        <div className="mb-8">
          <ShieldCheck size={52} className="text-green-400 mb-6" />

          <h1 className="text-4xl font-black text-black dark:text-white mb-3">
            AI Portfolio CMS
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-lg">Secure Administration Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-zinc-400 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
              w-full
              
              border
              bg-zinc-50 
              dark:bg-black
              border-zinc-300
              dark:border-zinc-700
              text-black 
              dark:text-white
              rounded-xl
              px-4
              py-4
              
              focus:outline-none
              focus:border-green-400
              transition-all
              "
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  transition-all
                "
            />
          </div>
          <div className="flex justify-end -mt-2">
  <button
  type="button"
  onClick={() => router.push("/admin/forgot-password")}
  className="
    text-sm
    text-emerald-600
    hover:text-emerald-500
    transition-colors
  "
>
  Forgot Password?
</button>
</div>

{error && (
  <p className="text-red-400">
    {error}
  </p>
)}
          

          <LoadingButton
  type="submit"
  loading={loading}
  className="
    w-full
    bg-emerald-500
    hover:bg-emerald-400
    hover:scale-[1.02]
    transition-all
    duration-200
    py-4
    rounded-xl
    text-black
    font-bold
    shadow-lg
    shadow-green-500/20
  "
>
  Login
</LoadingButton>

          <p className="text-center text-zinc-500 text-sm pt-2">
            Madhusudan`s Data Science Portfolio
          </p>
        </form>
      </div>
    </main>
  );
}
