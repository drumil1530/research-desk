import { Suspense } from "react";

import { Page, PageHeader, PageTitle } from "@/components/core/page";
import DashboardSections from "@/features/dashboard/components/dashboard-sections";
import DashboardSkeleton from "@/features/dashboard/components/skeletons/dashboard-skeleton";

export default function DashboardPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
      </PageHeader>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardSections />
      </Suspense>
    </Page>
  );
}
