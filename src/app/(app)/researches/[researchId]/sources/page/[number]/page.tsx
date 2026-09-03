import { type Metadata } from "next";

import SourceList from "@/features/source/components/list/source-list";

export const metadata: Metadata = {
  title: "Sources",
  description: "View and manage sources for this research.",
};

export const instant = false;

export default async function SourcePage({
  params,
  searchParams,
}: PageProps<"/researches/[researchId]/sources/page/[number]">) {
  const { researchId, number } = await params;
  const { search } = await searchParams;

  return (
    <SourceList
      page={Number(number)}
      researchId={researchId}
      search={search?.toString().trim().toLowerCase() || undefined}
    />
  );
}
