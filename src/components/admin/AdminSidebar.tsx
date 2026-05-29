interface AdminSidebarProps {
  sidebarOpen: boolean;

  activeSection: string;

  setActiveSection:
    React.Dispatch<
      React.SetStateAction<string>
    >;
}

export default function AdminSidebar({
  sidebarOpen,
  activeSection,
  setActiveSection,
}: AdminSidebarProps) 
{
  
  return (
    <aside className={`bg-black border-r border-zinc-800 min-h-screen p-8 transition-all duration-300 ${
      sidebarOpen
      ? "w-72"
      : "w-16"
    }`}>

     {sidebarOpen && (
  <div className="mb-12">
    <h1 className="text-3xl font-black text-green-400">
      DS Admin
    </h1>

    <p className="text-gray-500 text-sm mt-2">
      AI Portfolio CMS
    </p>
  </div>
)}

      <nav className={sidebarOpen ? "space-y-4" : "space-y-3"}>

        <button
  onClick={() =>
    setActiveSection("Dashboard")
  }
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
    activeSection === "Dashboard"
  ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
      : sidebarOpen
      ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
      : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 w-14 h-14 mx-auto justify-center"
  }`}
>

  <span className="text-xl">
    📊
  </span>

  {sidebarOpen && (
    <span className="font-medium">
      Dashboard
    </span>
  )}

</button>

        <button onClick={() =>
  setActiveSection("Projects")
}
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
  activeSection === "Projects"
    ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
    : sidebarOpen
    ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 w-14 h-14 mx-auto justify-center"
}`}
>

  <span className="text-xl">
    📁
  </span>

  {sidebarOpen && (
    <span className="font-medium">
      Projects
    </span>
  )}

</button>

        <button onClick={() =>
  setActiveSection("AI Research")
}
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
  activeSection === "AI Research"
    ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
    : sidebarOpen
    ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 w-14 h-14 mx-auto justify-center"
}`}
>

  <span className="text-xl">
    🧠
  </span>

  {sidebarOpen && (
    <span className="font-medium">
      AI Research
    </span>
  )}

</button>

        <button onClick={() =>
  setActiveSection("Analytics")
}
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
  activeSection === "Analytics"
    ? "bg-zinc-700 border-l-4 border-green-400 text-white px-5 py-4 justify-start gap-3"
    : sidebarOpen
    ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 px-5 py-4 justify-start gap-3"
    : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 w-14 h-14 mx-auto justify-center"
}`}
>

  <span className="text-xl">
    📈
  </span>

  {sidebarOpen && (
    <span className="font-medium">
      Analytics
    </span>
  )}

</button>

      </nav>
    </aside>
  );
}