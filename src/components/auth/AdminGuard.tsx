"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/src/hooks/useAuth";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({
  children,
}: AdminGuardProps) {

  const router = useRouter();

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !isAuthenticated
    ) {
      router.replace("/admin/login");
    }

  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}