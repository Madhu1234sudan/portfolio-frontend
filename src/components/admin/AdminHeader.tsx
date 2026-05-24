export default function AdminHeader() {
  return (
    <header className="border-b border-zinc-800 px-8 py-6 bg-zinc-950">
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h2>

          <p className="text-gray-500 mt-1">
            Manage AI & Data Science Portfolio
          </p>
        </div>

        <button className="bg-green-500 hover:bg-green-400 transition-all px-6 py-3 rounded-xl text-black font-semibold">
          Add New Project
        </button>

      </div>
    </header>
  );
}