"use client";

import { useState } from "react";

export default function useAsyncAction() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const execute = async (
    action: () => Promise<void>,
    successMessage?: string
  ) => {
    try {
      setLoading(true);

      setError("");

      setSuccess("");

      await action();

      if (successMessage) {
        setSuccess(successMessage);

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      }

    } catch (error) {

      console.error(error);

      setError("Something went wrong.");

      setTimeout(() => {
        setError("");
      }, 3000);

    } finally {

      setLoading(false);

    }
  };

  return {
    loading,
    error,
    success,
    setError,
    setSuccess,
    execute,
  };
}