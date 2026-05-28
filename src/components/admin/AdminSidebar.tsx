interface AdminSidebarProps{
  sidebarOpen : boolean;
}
export default function AdminSidebar({
  sidebarOpen,
}: AdminSidebarProps ) 
{
  const activeSection =
    "Dashboard";
  return (
    <aside className={`bg-black border-r border-zinc-800 min-h-screen p-8 transition-all duration-300 ${
      sidebarOpen
      ? "w-72"
      : "w-24"
    }`}>

      <div className="mb-12 overflow-hidden">

  <h1
    className={`font-black text-green-400 transition-all duration-300 ${
      sidebarOpen
        ? "text-3xl opacity-100"
        : "text-0 opacity-0 hidden"
    }`}
  >
    DS Admin
  </h1>

  {sidebarOpen && (
    <p className="text-gray-500 text-sm mt-2">
      AI Portfolio CMS
    </p>
  )}

</div>

      <nav className="space-y-4">

        <button
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
    activeSection === "Dashboard"
      ? "bg-green-500 text-black border-green-400 shadow-lg shadow-green-500/20"
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

        <button
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
    sidebarOpen
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

        <button
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
    sidebarOpen
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

        <button
  className={`w-full flex items-center transition-all rounded-2xl border text-white ${
    sidebarOpen
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