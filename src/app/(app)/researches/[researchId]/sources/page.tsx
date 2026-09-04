import { type Metadata } from "next";
import { Suspense } from "react";

import SourceList from "@/features/source/components/list/source-list";
import SourceListSkeleton from "@/features/source/components/list/source-list-skeleton";

export const metadata: Metadata = {
  title: "Sources",
  description: "View and manage sources for this research.",
};

export default async function ResearchSourcesPage(
  pageProps: PageProps<"/researches/[researchId]/sources">,
) {
  return (
    <Suspense fallback={<SourceListSkeleton />}>
      <SourceList pageProps={pageProps} />
    </Suspense>
  );
}
