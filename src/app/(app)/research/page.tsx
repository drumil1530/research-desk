import { Suspense } from "react";

import {
  Page,
  PageActions,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import CreateResearchDialog from "@/features/research/components/create/create-research-dialog";
import ResearchList from "@/features/research/components/list/research-list";
import ResearchListSkeleton from "@/features/research/components/list/research-list-skeleton";

export default function ResearchPage() {
  return (
    <Page>
      <PageHeader>
        <div className="space-y-1">
          <PageTitle>Research</PageTitle>
          <PageDescription>Explore and manage your research.</PageDescription>
        </div>

        <PageActions>
          <CreateResearchDialog />
        </PageActions>
      </PageHeader>

      <PageContent>
        <Suspense fallback={<ResearchListSkeleton />}>
          <ResearchList />
        </Suspense>
      </PageContent>
    </Page>
  );
}
