import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BrainCircuit,
  BarChart3,
  Code2,
  UserCog,
  Briefcase,
  FolderTree,
} from "lucide-react";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    name: "Profile Management",
    icon: UserCog,
    href: "/admin/dashboard/profile",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    href: "/admin/dashboard/projects",
  },
  {
    name: "AI Research",
    icon: BrainCircuit,
    href: "/admin/dashboard/research",
  },
  {
    name: "Skills",
    icon: Code2,
    href: "/admin/dashboard/skills",
  },
  {
    name: "Skill Categories",
    icon: FolderTree,
    href: "/admin/dashboard/skill-categories",
  },
  {
    name: "Experience",
    icon: Briefcase,
    href: "/admin/dashboard/experience",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    href: "/admin/dashboard/analytics",
  },
];

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
const router = useRouter();
const pathname = usePathname();
  return (
    <aside
      className={`
  fixed
  top-0
  left-0
  z-40
  h-screen
  pt-[89px]

  w-72

  bg-white
  dark:bg-zinc-950

  border-r
  border-zinc-200
  dark:border-zinc-800

  shadow-2xl
  shadow-black/5

  transition-transform
  duration-300
  ease-in-out

  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
`}
    >
      <div className="h-full flex flex-col">
        <div className="px-8 py-8 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-3xl font-black text-green-500">DS Admin</h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            AI Portfolio CMS
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <button
  key={item.name}
  onClick={() => {
  router.push(item.href);
  setSidebarOpen(false);
}}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  hover:translate-x-1

                  ${
                    isActive
                      ? `
                        bg-green-100
                        dark:bg-green-500/10
                        text-green-700
                        dark:text-green-400
                      `
                      : `
                        text-zinc-700
                        dark:text-zinc-300
                        hover:bg-zinc-100
                        dark:hover:bg-zinc-900
                      `
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
