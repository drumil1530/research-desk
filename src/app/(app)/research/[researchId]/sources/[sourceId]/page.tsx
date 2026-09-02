import { Suspense } from "react";

import SourceDetail from "@/features/source/components/detail/source-detail";

export default function SourcePage({
  params,
}: PageProps<"/research/[researchId]/sources/[sourceId]">) {
  return (
    <Suspense>
      <SourceDetail params={params} />
    </Suspense>
  );
}
