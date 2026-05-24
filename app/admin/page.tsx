import AdminSidebar from "../../src/components/admin/AdminSidebar";
import AdminHeader from "../../src/components/admin/AdminHeader";
import ProjectTable from "../../src/components/admin/ProjectTable";

export default function AdminPage() {
  return (
    <main className="flex bg-zinc-950 min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <ProjectTable />

      </div>

    </main>
  );
}