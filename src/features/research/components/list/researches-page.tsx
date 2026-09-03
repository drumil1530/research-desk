import { Suspense } from "react";

import {
  Page,
  PageActions,
  PageBreadcrumb,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import CreateResearchDialog from "@/features/research/components/create/create-research-dialog";
import ResearchList from "@/features/research/components/list/research-list";
import ResearchListSkeleton from "@/features/research/components/list/research-list-skeleton";

type ResearchesPageProps = {
  page: number;
  search?: string | undefined;
};

export default function ResearchesPage({ page, search }: ResearchesPageProps) {
  return (
    <Page>
      <PageBreadcrumb items={[{ page: "Researches" }]} />

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
          <ResearchList page={page} search={search} />
        </Suspense>
      </PageContent>
    </Page>
  );
}
