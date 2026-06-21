"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

import AdminSidebar from "../../src/components/admin/AdminSidebar";
import AdminHeader from "../../src/components/admin/AdminHeader";
import ProjectTable from "../../src/components/admin/ProjectTable";
import AddProjectForm from "../../src/components/admin/AddProjectForm";
import api from "../../src/lib/api";
import { Project } from "../../src/types/project";
import { Research } from "../../src/types/research";
import ResearchTable from "../../src/components/admin/ResearchTable";
import AddResearchForm from "../../src/components/admin/AddResearchForm";
import ProfileManagement from "@/src/components/admin/ProfileManagement";
import { SkillCategory } from "../../src/types/skillCategory";
import { Skill } from "../../src/types/skill";
import AddSkillCategoryForm from "@/src/components/admin/AddSkillCategoryForm";
import SkillCategoryTable from "@/src/components/admin/SkillCategoryTable";
import EditSkillCategoryModal from "@/src/components/admin/EditSkillCategoryModal";
import AddSkillForm from "@/src/components/admin/AddSkillForm";
import SkillTable from "@/src/components/admin/SkillTable";
import EditSkillModal from "@/src/components/admin/EditSkillModal";
import { Experience } from "@/src/types/experience";
import AddExperienceForm from "@/src/components/admin/AddExperienceForm";
import ExperienceTable from "@/src/components/admin/ExperienceTable";
import EditExperienceModal from "@/src/components/admin/EditExperienceModal";
import {
  DashboardHero,
  DashboardStatistics,
  RecentProjects,
} from "@/src/components/admin/dashboard";



interface DecodedToken {
  exp: number;
}
interface ExperienceTableProps {
  experiences: Experience[];

  setExperiences: React.Dispatch<
    React.SetStateAction<Experience[]>
  >;

  setEditingExperience: React.Dispatch<
    React.SetStateAction<Experience | null>
  >;

  setEditExperienceOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function AdminPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] =  useState("Dashboard");
  const [projects, setProjects] =  useState<Project[]>([]);
  const [research, setResearch] =  useState<Research[]>([]);
  const [skillCategories, setSkillCategories] =  useState<SkillCategory[]>([]);
  const [skills, setSkills] =  useState<Skill[]>([]);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editSkillOpen, setEditSkillOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExperience,setEditingExperience,] = useState<Experience | null>(null);
  const [editExperienceOpen,setEditExperienceOpen,] = useState(false);
  

  
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        sessionStorage.removeItem("adminToken");

        router.push("/admin/login");
      }
      const fetchProjects = async () => {
  
  try {
    const response = await api.get(
      "/projects"
    );

    setProjects(response.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchSkillCategories = async () => {
  try {
    const response =
      await api.get("/skill-categories");

    setSkillCategories(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchSkills = async () => {
  try {
    const response =
      await api.get("/skills");

    setSkills(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchExperiences = async () => {
  try {
    const response =
      await api.get("/experience");

    setExperiences(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchResearch = async () => {
  try {
    const response = await api.get(
      "/research"
    );

    setResearch(response.data);
  } catch (error) {
    console.error(error);
  }
};
fetchProjects();
fetchResearch();
fetchSkillCategories();
fetchSkills();
fetchExperiences();
    } catch {
      sessionStorage.removeItem("adminToken");

      router.push("/admin/login");
    }
  }, [router]);
  const featuredProjects =
  projects.filter(
    (project) => project.featured
  );

const regularProjects =
  projects.filter(
    (project) => !project.featured
  );

const featuredRatio =
  projects.length > 0
    ? Math.round(
        (featuredProjects.length /
          projects.length) *
          100
      )
    : 0;

const techCounts: Record<
  string,
  number
> = {};

projects.forEach((project) => {
  project.techStack.forEach((tech) => {
    techCounts[tech] =
      (techCounts[tech] || 0) + 1;
  });
});

const mostUsedTech =
  Object.keys(techCounts).length > 0
    ? Object.entries(techCounts)
        .sort((a, b) => b[1] - a[1])[0][0]
    : "None";
  const latestProject =
    projects.length > 0 ? projects[0] : null;
    
  return (
    <main className="
flex
min-h-screen
bg-zinc-100
dark:bg-zinc-950
transition-colors
">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {sidebarOpen && (
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div className="flex-1">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-8 space-y-8">
          {activeSection === "Dashboard" && (
            <div className="space-y-8">
              
              {/* Dashboard Hero */}
<DashboardHero
  onAddProject={() => setActiveSection("AddProject")}
  onViewProjects={() => setActiveSection("Projects")}
/>

              {/* Stats Cards */}
              <DashboardStatistics
  projects={projects}
  latestProject={latestProject}
/>

              {/* Recent Projects */}
              <RecentProjects
  projects={projects}
  onViewProjects={() => setActiveSection("Projects")}
/>
            </div>
          )}

          {activeSection === "AddProject" && (
  <AddProjectForm
    setProjects={setProjects}
  />
)}
{activeSection === "Profile Management" && (
  <ProfileManagement />
)}
{activeSection === "Projects" && (
  <ProjectTable
    projects={projects}
    setProjects={setProjects}
  />
)}
{activeSection === "Skills" && (
  <>
    <div className="space-y-8">

      <AddSkillCategoryForm
        setSkillCategories={setSkillCategories}
      />

      <SkillCategoryTable
        skillCategories={skillCategories}
        setSkillCategories={setSkillCategories}
        setEditingCategory={setEditingCategory}
        setEditCategoryOpen={setEditCategoryOpen}
      />
      <AddSkillForm
              skillCategories={
                skillCategories
              }
              setSkills={setSkills}
            />
            <SkillTable
              skills={skills}
              setSkills={setSkills}
              setEditingSkill={setEditingSkill}
              setEditSkillOpen={setEditSkillOpen}
            />

    </div>

    <EditSkillCategoryModal
      open={editCategoryOpen}
      onClose={() => {
        setEditCategoryOpen(false);
        setEditingCategory(null);
      }}
      category={editingCategory}
      setSkillCategories={setSkillCategories}
    />
    <EditSkillModal
  open={editSkillOpen}
  onClose={() => {
    setEditSkillOpen(false);
    setEditingSkill(null);
  }}
  skill={editingSkill}
  skillCategories={skillCategories}
  setSkills={setSkills}
/>
  </>
)}
{activeSection === "Experience" && (
  <>
    <div className="space-y-8">

      <AddExperienceForm
        setExperiences={setExperiences}
      />

      <ExperienceTable
        experiences={experiences}
        setExperiences={setExperiences}
        setEditingExperience={setEditingExperience}
        setEditExperienceOpen={setEditExperienceOpen}
      />

    </div>

    <EditExperienceModal
      open={editExperienceOpen}
      onClose={() => {
        setEditExperienceOpen(false);
        setEditingExperience(null);
      }}
      experience={editingExperience}
      setExperiences={setExperiences}
    />

  </>
)}
{activeSection === "AI Research" && (
  <div className="space-y-8">
    <AddResearchForm
      setResearch={setResearch}
    />

    <ResearchTable
      research={research}
      setResearch={setResearch}
    />
  </div>
)}
          


          {activeSection === "Analytics" && (
            <div className="space-y-8">
              <div className="
bg-white
dark:bg-zinc-900
border
border-zinc-300
dark:border-zinc-800
rounded-2xl
p-6
">
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                  Analytics Dashboard
                </h2>

                <p className="text-zinc-400">Real-time portfolio statistics.</p>
              </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Total Projects */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Total Projects
    </h3>

    <p className="text-4xl font-bold text-black dark:text-white mt-3">
      {projects.length}
    </p>
  </div>

  {/* Featured */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Featured Projects
    </h3>

    <p className="text-4xl font-bold text-green-500 mt-3">
      {featuredProjects.length}
    </p>
  </div>

  {/* Regular */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Regular Projects
    </h3>

    <p className="text-4xl font-bold text-black dark:text-white mt-3">
      {regularProjects.length}
    </p>
  </div>

  {/* Most Used Tech */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Most Used Technology
    </h3>

    <p className="text-2xl font-bold text-blue-500 mt-3">
      {mostUsedTech}
    </p>
  </div>

  {/* Featured Ratio */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Featured Ratio
    </h3>

    <p className="text-4xl font-bold text-purple-500 mt-3">
      {featuredRatio}%
    </p>
  </div>

  {/* Last Project */}
  <div className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl p-6">
    <h3 className="text-zinc-500 text-sm">
      Last Created Project
    </h3>

    <p className="text-xl font-bold text-black dark:text-white mt-3">
      {latestProject
        ? latestProject.title
        : "None"}
    </p>
  </div>

</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
