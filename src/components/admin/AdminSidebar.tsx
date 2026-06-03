interface AdminSidebarProps {
  sidebarOpen: boolean;

  activeSection: string;

  setActiveSection: React.Dispatch<React.SetStateAction<string>>;

  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminSidebar({
  sidebarOpen,
  activeSection,
  setActiveSection,
  setSidebarOpen,
}: AdminSidebarProps) {
  return (
    <aside
      className={`fixed top-[88px] left-0 z-50 h-[calc(100vh-88px)] bg-black border-r border-zinc-800 transition-all duration-300 overflow-hidden ${
        sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
      }`}
    >
      <div className="p-8"></div>

      {sidebarOpen && (
        <div className="mb-12">
          <h1 className="text-3xl font-black text-green-400">DS Admin</h1>

          <p className="text-gray-500 text-sm mt-2">AI Portfolio CMS</p>
        </div>
      )}

      <nav className="space-y-4">
        <button
          onClick={() => {
            setActiveSection("Dashboard");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center transition-all rounded-2xl border text-white ${
            activeSection === "Dashboard"
              ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
              : sidebarOpen
                ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
          }`}
        >
          <span className="text-xl">📊</span>

          {sidebarOpen && <span className="font-medium">Dashboard</span>}
        </button>

        <button
          onClick={() => {
            setActiveSection("Projects");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center transition-all rounded-2xl border text-white ${
            activeSection === "Projects"
              ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
              : sidebarOpen
                ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
          }`}
        >
          <span className="text-xl">📁</span>

          {sidebarOpen && <span className="font-medium">Projects</span>}
        </button>

        <button
          onClick={() => {
            setActiveSection("AI Research");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center transition-all rounded-2xl border text-white ${
            activeSection === "AI Research"
              ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
              : sidebarOpen
                ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
          }`}
        >
          <span className="text-xl">🧠</span>

          {sidebarOpen && <span className="font-medium">AI Research</span>}
        </button>

        <button
          onClick={() => {
            setActiveSection("Analytics");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center transition-all rounded-2xl border text-white ${
            activeSection === "Analytics"
              ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
              : sidebarOpen
                ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
          }`}
        >
          <span className="text-xl">📈</span>

          {sidebarOpen && <span className="font-medium">Analytics</span>}
        </button>
      </nav>
    </aside>
  );
}
