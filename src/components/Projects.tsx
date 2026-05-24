"use client";

import { useEffect, useState } from "react";

import api from "../lib/api";
import { Project } from "../types/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");

        setProjects(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch projects:",
          error
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-zinc-950 text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-4">
            Portfolio Projects
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            AI & Data Science Projects
          </h2>
        </div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500 transition-all duration-300"
            >

              {/* IMAGE PLACEHOLDER */}
              <div className="h-56 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-zinc-900 flex items-center justify-center">
                <h3 className="text-5xl font-black text-green-400 opacity-30">
                  AI
                </h3>
              </div>

              {/* CONTENT */}
              <div className="p-8">

                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-4">
                  {project.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 leading-7 mb-6">
                  {project.description}
                </p>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4">

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-5 py-3 rounded-xl transition-all"
                    >
                      GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-3 rounded-xl transition-all"
                    >
                      Live Demo
                    </a>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}