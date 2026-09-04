import { type Metadata } from "next";
import { Suspense } from "react";

import SourceDetail from "@/features/source/components/detail/source-detail";
import SourceDetailSkeleton from "@/features/source/components/detail/source-detail-skeleton";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

export async function generateMetadata({
  params,
}: PageProps<"/researches/[researchId]/sources/[sourceId]">): Promise<Metadata> {
  const { researchId, sourceId: id } = await params;
  const { id: userId } = await authService.getUserOrRedirect();
  const research = await service.source.getTitleById({ id, researchId, userId });

  return {
    title: research?.title ?? "Source",
  };
}

export default function SourcePage({
  params,
}: PageProps<"/researches/[researchId]/sources/[sourceId]">) {
  return (
    <Suspense fallback={<SourceDetailSkeleton />}>
      <SourceDetail params={params} />
    </Suspense>
  );
}
