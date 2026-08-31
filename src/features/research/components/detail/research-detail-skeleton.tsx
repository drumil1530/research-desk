import { Page, PageActions, PageContent, PageHeader, PageTitle } from "@/components/core/page";
import { Skeleton } from "@/coss/ui/skeleton";

export default function ResearchDetailSkeleton() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>
          <Skeleton className="h-8 w-64" />
        </PageTitle>

        <PageActions>
          <Skeleton className="h-8 w-17.5 rounded-lg" />
          <Skeleton className="h-8 w-27 rounded-lg" />
          <Skeleton className="h-8 w-21.75 rounded-lg" />
          <Skeleton className="h-4.5 w-11 rounded-sm" />
        </PageActions>
      </PageHeader>

      <PageContent className="grid gap-2">
        <Skeleton className="h-5 w-full max-w-2xl" />
        <Skeleton className="h-5 w-4/5 max-w-xl" />
        <Skeleton className="mt-2 h-4 w-32" />
      </PageContent>
    </Page>
  );
}
