"use client";

import { Research } from "@/src/types/research";

import AddResearchForm from "@/src/admin/research/forms/AddResearchForm";
import ResearchTable from "@/src/admin/research/components/ResearchTable";

interface ResearchSectionProps {
  research: Research[];

  setResearch: React.Dispatch<
    React.SetStateAction<Research[]>
  >;
}

export default function ResearchSection({
  research,
  setResearch,
}: ResearchSectionProps) {
  return (
    <div className="space-y-8">

      <AddResearchForm
        setResearch={setResearch}
      />

      <ResearchTable
        research={research}
        setResearch={setResearch}
      />

    </div>
  );
}