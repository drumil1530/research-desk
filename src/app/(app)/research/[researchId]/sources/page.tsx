import { Suspense } from "react";

import SourceListSkeleton from "@/features/note/components/list/note-list-skeleton";
import SourceList from "@/features/source/components/list/source-list";

export default function ResearchSourcesPage({
  params,
}: PageProps<"/research/[researchId]/sources">) {
  return (
    <Suspense fallback={<SourceListSkeleton />}>
      <SourceList params={params} />
    </Suspense>
  );
}
