import { type Metadata } from "next";

import SourceList from "@/features/source/components/list/source-list";

export const metadata: Metadata = {
  title: "Sources",
  description: "View and manage sources for this research.",
};

export const instant = false;

export default async function ResearchSourcesPage({
  params,
  searchParams,
}: PageProps<"/researches/[researchId]/sources">) {
  const { researchId } = await params;
  const { search } = await searchParams;

  return (
    <SourceList
      page={1}
      researchId={researchId}
      search={search?.toString().trim().toLowerCase() || undefined}
    />
  );
}
