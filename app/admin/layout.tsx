"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useAuth from "@/src/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname);

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated &&
      !isPublicRoute
    ) {
      router.replace("/admin/login");
    }

    if (
      !loading &&
      isAuthenticated &&
      pathname === "/admin/login"
    ) {
      router.replace("/admin/dashboard");
    }
  }, [
    loading,
    isAuthenticated,
    pathname,
    isPublicRoute,
    router,
  ]);

  if (
    loading &&
    !isPublicRoute
  ) {
    return (
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        text-lg
        "
      >
        Loading...
      </div>
    );
  }

  return children;
}