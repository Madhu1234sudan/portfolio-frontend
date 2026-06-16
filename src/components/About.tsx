"use client";

import useProfile from "@/src/hooks/useProfile";

export default function About() {
  const { profile, loading } =
    useProfile();

  if (loading) {
    return (
      <section className="bg-zinc-950 min-h-[400px]" />
    );
  }

  return (
    <section className="bg-zinc-950 text-white py-24 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <p className="text-green-400 uppercase tracking-widest text-sm mb-4">
            About Me
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {profile?.headline}
          </h2>

          <p className="text-gray-400 leading-8 whitespace-pre-line">
            {profile?.aboutMe}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-4xl font-bold text-green-400 mb-2">
              ML
            </h3>

            <p className="text-gray-400">
              Machine Learning & Predictive Modeling
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-4xl font-bold text-green-400 mb-2">
              NLP
            </h3>

            <p className="text-gray-400">
              Active Learning & Text Intelligence
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-4xl font-bold text-green-400 mb-2">
              SQL
            </h3>

            <p className="text-gray-400">
              Analytics, Queries & Data Engineering
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-4xl font-bold text-green-400 mb-2">
              AI
            </h3>

            <p className="text-gray-400">
              Intelligent Systems & Automation
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}