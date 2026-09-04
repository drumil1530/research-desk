import { Dot } from "lucide-react";

import { Page, PageBreadcrumb, PageContent, PageHeader } from "@/components/core/page";
import { Button } from "@/coss/ui/button";
import { Card, CardContent } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";
import ROUTES from "@/shared/routes";

export default function ResearchNotesSkeleton() {
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
                Notes
              </Button>
            ),
          },
        ]}
      />

      <PageHeader className="flex-row items-center justify-between">
        <Skeleton className="h-7 w-28" />

        <Skeleton className="h-8 w-17.5 rounded-lg" />
      </PageHeader>

      <PageContent>
        <Card>
          <CardContent className="p-4 md:py-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-2 py-3 -ms-2">
                <Dot className="size-6 shrink-0 animate-pulse" />

                <div className="flex min-w-0 flex-1 mt-1 flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>

                <Skeleton className="size-7 rounded-lg shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  );
}
