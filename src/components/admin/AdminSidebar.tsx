export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-black border-r border-zinc-800 min-h-screen p-8">

      <div className="mb-12">
        <h1 className="text-3xl font-black text-green-400">
          DS Admin
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          AI Portfolio CMS
        </p>
      </div>

      <nav className="space-y-4">

        <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 transition-all px-5 py-4 rounded-xl border border-zinc-800">
          Dashboard
        </button>

        <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 transition-all px-5 py-4 rounded-xl border border-zinc-800">
          Projects
        </button>

        <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 transition-all px-5 py-4 rounded-xl border border-zinc-800">
          AI Research
        </button>

        <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 transition-all px-5 py-4 rounded-xl border border-zinc-800">
          Analytics
        </button>

      </nav>
    </aside>
  );
}