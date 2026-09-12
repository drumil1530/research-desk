import { type Metadata } from "next";
import { Suspense } from "react";

import { Page, PageDescription, PageHeader, PageTitle } from "@/components/core/page";
import DashboardSections from "@/features/dashboard/components/dashboard-sections";
import DashboardSkeleton from "@/features/dashboard/components/skeletons/dashboard-skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your research and recent activity.",
};

export default function DashboardPage() {
  return (
    <Page>
      <PageHeader className="sm:flex-col sm:items-start gap-2">
        <PageTitle>Dashboard</PageTitle>
        <PageDescription> Overview of your research and recent activity. </PageDescription>
      </PageHeader>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardSections />
      </Suspense>
    </Page>
  );
}
