import { Suspense } from "react";

import ResearchDetail from "@/features/research/components/detail/research-detail";
import ResearchDetailSkeleton from "@/features/research/components/detail/research-detail-skeleton";

export default async function ResearchPage({ params }: PageProps<"/research/[id]">) {
  return (
    <Suspense fallback={<ResearchDetailSkeleton />}>
      <ResearchDetail params={params} />
    </Suspense>
  );
}
