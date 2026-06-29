"use client";

import { useEffect } from "react";

import useResearch from "@/src/hooks/admin/useResearch";

import ResearchSection from "@/src/admin/dashboard/sections/ResearchSection";

export default function ResearchPage() {
  const {
    research,
    setResearch,
    refreshResearch,
  } = useResearch();

  useEffect(() => {
    refreshResearch();
  }, [refreshResearch]);

  return (
    <ResearchSection
      research={research}
      setResearch={setResearch}
    />
  );
}