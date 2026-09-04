import { Dot } from "lucide-react";

import { Page, PageActions, PageBreadcrumb, PageContent, PageHeader } from "@/components/core/page";
import { BreadcrumbEllipsis } from "@/coss/ui/breadcrumb";
import { Button } from "@/coss/ui/button";
import { CardFrame, CardFrameHeader, Card, CardContent } from "@/coss/ui/card";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/coss/ui/menu";
import { Skeleton } from "@/coss/ui/skeleton";
import ROUTES from "@/shared/routes";

export default function SourceDetailSkeleton() {
  return (
    <Page>
      <PageBreadcrumb
        items={[
          { label: "Researches", href: ROUTES.researchList },
          { label: <Skeleton className="h-4 w-32" /> },
          {
            label: (
              <Menu>
                <MenuTrigger
                  render={
                    <Button
                      className="-m-1.5 text-muted-foreground"
                      size="icon-sm"
                      variant="ghost"
                    />
                  }
                >
                  <BreadcrumbEllipsis />
                </MenuTrigger>
                <MenuPopup align="start">
                  <MenuItem>Source</MenuItem>
                  <MenuItem>Notes</MenuItem>
                </MenuPopup>
              </Menu>
            ),
          },
          {
            page: <Skeleton className="h-4 w-32" />,
          },
        ]}
      />

      <PageHeader className="flex-row gap-1 items-start">
        <div className="flex flex-wrap items-center justify-between gap-2 grow">
          <Skeleton className="h-7 w-3/5 max-w-md" />
          <Skeleton className="h-4.5 w-23.5" />
        </div>

        <PageActions>
          <Skeleton className="size-7 rounded-lg" />
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="space-y-3">
          <Skeleton className="h-5 w-4/5 max-w-2xl" />
          <Skeleton className="h-4 w-full max-w-3xl" />
        </div>
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader className="flex-row items-center justify-between py-3 pe-2.5 sm:pe-4">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7.25 w-17.5 rounded-lg" />
          </CardFrameHeader>

          <Card>
            <CardContent className="p-4 md:py-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-2 py-3 -ms-2">
                  <Dot className="size-6 shrink-0 animate-pulse" />

                  <div className="flex min-w-0 flex-1 mt-1 flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>

                  <Skeleton className="size-7 rounded-lg shrink-0 -mr-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </CardFrame>
      </PageContent>
    </Page>
  );
}
