"use client";

import {
  useState,
  useEffect,
  ReactNode,
} from "react";

import api from "../lib/api";

import { AuthContext } from "../context/AuthContext";

import {
  Admin,
} from "../types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {

  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser = async () => {

    try {

      const token =
        sessionStorage.getItem(
          "adminToken"
        );

      if (!token) {
        setAdmin(null);
        return;
      }

      const response =
        await api.get("/auth/me");

      setAdmin(response.data);

    } catch (error) {

      console.error(error);

      sessionStorage.removeItem(
        "adminToken"
      );

      setAdmin(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (
  email: string,
  password: string
) => {

  const response =
    await api.post("/auth/login", {
      email,
      password,
    });

  console.log("Login Success:", response.data);

  sessionStorage.setItem(
    "adminToken",
    response.data.token
  );

  await refreshUser();

  console.log("Admin Loaded");

};

  const logout = () => {

    sessionStorage.removeItem(
      "adminToken"
    );

    setAdmin(null);

  };

  return (
    <AuthContext.Provider
      value={{
        admin,

        loading,

        isAuthenticated:
          admin !== null,

        login,

        logout,

        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}