import { type Metadata } from "next";
import { Suspense } from "react";

import ResearchDetail from "@/features/research/components/detail/research-detail";
import ResearchDetailSkeleton from "@/features/research/components/detail/research-detail-skeleton";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

export async function generateMetadata({
  params,
}: PageProps<"/researches/[researchId]">): Promise<Metadata> {
  const { researchId: id } = await params;
  const { id: userId } = await authService.getUserOrRedirect();
  const research = await service.research.getTitleById({ researchId: id, userId });

  return {
    title: research?.title ?? "Research",
  };
}

export default async function ResearchPage({ params }: PageProps<"/researches/[researchId]">) {
  return (
    <Suspense fallback={<ResearchDetailSkeleton />}>
      <ResearchDetail params={params} />
    </Suspense>
  );
}
