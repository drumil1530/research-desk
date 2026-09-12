import { Page, PageBreadcrumb, PageContent, PageHeader } from "@/components/core/page";
import { Button } from "@/coss/ui/button";
import { Card, CardHeader } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";
import ROUTES from "@/shared/routes";

export default function SourceListSkeleton() {
  return (
    <Page>
      <PageBreadcrumb
        items={[
          { label: "Researches", href: ROUTES.researchList },
          { label: <Skeleton className="h-4 w-32" /> },
          {
            page: (
              <Button
                variant="ghost"
                size="sm"
                className="-mx-1.25 -my-1.5 sm:-ms-2 text-sm h-6 px-1 sm:px-2"
              >
                Sources
              </Button>
            ),
          },
        ]}
      />

      <PageHeader className="flex-row items-center justify-between">
        <Skeleton className="h-7 w-34" />

        <Skeleton className="h-8 w-17.5 rounded-lg" />
      </PageHeader>

      <PageContent className="flex flex-col gap-2">
        <div className="flex gap-1.5">
          <Skeleton className="h-9 md:h-8 flex-1 rounded-lg" />
          <Skeleton className="h-9 w-9.5 md:h-8 md:w-22.5 rounded-lg" />
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="grid-cols-1">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-4/5" />

              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-40" />

                <div className="flex gap-1">
                  <Skeleton className="h-4.5 w-17" />
                  <Skeleton className="h-4.5 w-12.75" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </PageContent>
    </Page>
  );
}
