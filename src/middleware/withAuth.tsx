"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "../hooks/useAuth";

export default function withAuth<T extends object>(
  Component: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const {
      loading,
      isAuthenticated,
    } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace("/admin/login");
      }
    }, [loading, isAuthenticated, router]);

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

    return <Component {...props} />;
  };
}