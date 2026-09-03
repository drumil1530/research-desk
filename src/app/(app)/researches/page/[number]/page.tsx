import { type Metadata } from "next";

import ResearchesPage from "@/features/research/components/list/researches-page";

export const metadata: Metadata = {
  title: "Research",
  description: "Explore and manage your research.",
};

export const instant = false;

export default async function ResearchPage({
  params,
  searchParams,
}: PageProps<"/researches/page/[number]">) {
  const { number } = await params;
  const { search } = await searchParams;

  return (
    <ResearchesPage
      page={Number(number)}
      search={search?.toString().trim().toLowerCase() || undefined}
    />
  );
}
