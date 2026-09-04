import { Dot } from "lucide-react";

import {
  Page,
  PageActions,
  PageBreadcrumb,
  PageContent,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import { Card, CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";
import ROUTES from "@/shared/routes";

export default function ResearchDetailSkeleton() {
  return (
    <Page>
      <PageBreadcrumb
        items={[
          { label: "Researches", href: ROUTES.researchList },
          { page: <Skeleton className="h-4 w-32" /> },
        ]}
      />

      <PageHeader>
        <div>
          <PageTitle>
            <Skeleton className="h-7 w-64 sm:h-8" />
          </PageTitle>
        </div>

        <PageActions>
          <Skeleton className="h-8 w-17.25 rounded-lg" />
          <Skeleton className="h-8 w-27 rounded-lg" />
          <Skeleton className="h-8 w-21.75 rounded-lg" />
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="grid gap-2">
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-4/5 max-w-xl" />

          <div className="mt-2 flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4.5 w-10.75 rounded-md" />
          </div>
        </div>
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader>
            <CardFrameTitle>
              <Skeleton className="h-5 w-20" />
            </CardFrameTitle>

            <CardFrameAction>
              <Skeleton className="h-5 w-16" />
            </CardFrameAction>
          </CardFrameHeader>

          <Card>
            <div className="flex flex-col gap-3 p-4 md:px-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-2">
                  <Skeleton className="h-4 w-3/5" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
              ))}
            </div>
          </Card>
        </CardFrame>
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader>
            <CardFrameTitle>
              <Skeleton className="h-5 w-20" />
            </CardFrameTitle>

            <CardFrameAction>
              <Skeleton className="h-5 w-16" />
            </CardFrameAction>
          </CardFrameHeader>

          <Card>
            <div className="flex flex-col gap-2 p-4 md:px-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Dot className="size-6 shrink-0 animate-pulse" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </Card>
        </CardFrame>
      </PageContent>
    </Page>
  );
}
