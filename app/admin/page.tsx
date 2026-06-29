import AdminGuard from "@/src/components/auth/AdminGuard";

export default function DashboardPage() {
  return (
    <AdminGuard>
      <div>
        Dashboard Content
      </div>
    </AdminGuard>
  );
}