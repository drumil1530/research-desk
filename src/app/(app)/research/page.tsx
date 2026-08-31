import { Suspense } from "react";

import {
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@/coss/ui/card";
import CreateResearchDialog from "@/features/research/components/create/create-research-dialog";
import ResearchList from "@/features/research/components/list/research-list";
import ResearchListSkeleton from "@/features/research/components/list/research-list-skeleton";

export default function ResearchPage() {
  return (
    <CardFrame className="mx-auto flex w-full max-w-5xl">
      <CardFrameHeader>
        <CardFrameTitle className="text-2xl">Research</CardFrameTitle>
        <CardFrameDescription>Explore and manage your research.</CardFrameDescription>

        <CardFrameAction>
          <CreateResearchDialog />
        </CardFrameAction>
      </CardFrameHeader>

      <CardPanel className="pt-2">
        <Suspense fallback={<ResearchListSkeleton />}>
          <ResearchList />
        </Suspense>
      </CardPanel>
    </CardFrame>
  );
}
