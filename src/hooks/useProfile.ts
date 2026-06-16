"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

import { Profile } from "../types/profile";

export default function useProfile() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response =
          await api.get("/profile");

        setProfile(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    loading,
  };
}