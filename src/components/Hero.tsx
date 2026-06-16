"use client";

import Image from "next/image";
import useProfile from "@/src/hooks/useProfile";

export default function Hero() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <section className="min-h-screen bg-black" />
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-green-400 text-sm uppercase tracking-[0.3em] mb-4">
            {profile?.fullName}
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            {profile?.headline}
          </h1>

          <p className="text-gray-400 text-lg leading-8 mb-8">
            {profile?.shortBio}
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="
              bg-green-500
              hover:bg-green-400
              transition-all
              px-6
              py-3
              rounded-xl
              text-black
              font-semibold
              "
            >
              Explore Projects
            </button>

            <button
              className="
              border
              border-gray-700
              hover:border-green-400
              transition-all
              px-6
              py-3
              rounded-xl
              "
            >
              View Research
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-12 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold text-green-400">
                ML
              </h2>

              <p className="text-gray-500 text-sm">
                Machine Learning Systems
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400">
                NLP
              </h2>

              <p className="text-gray-500 text-sm">
                Text Classification & AI
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-400">
                SQL
              </h2>

              <p className="text-gray-500 text-sm">
                Data Analytics & Insights
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex justify-center">
          <div
            className="
            w-[380px]
            h-[380px]
            rounded-full
            bg-gradient-to-br
            from-green-500/20
            via-emerald-500/10
            to-blue-500/20
            flex
            items-center
            justify-center
            border
            border-gray-800
            shadow-2xl
            overflow-hidden
            "
          >
            {profile?.profileImage ? (
              <Image
                src={profile.profileImage}
                alt={profile.fullName}
                width={380}
                height={380}
                priority
                className="
                w-full
                h-full
                object-cover
                "
              />
            ) : (
              <div className="text-center">
                <h2 className="text-8xl font-black text-green-400">
                  DS
                </h2>

                <p className="text-gray-400 mt-4 text-lg">
                  Data Science & AI Portfolio
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}