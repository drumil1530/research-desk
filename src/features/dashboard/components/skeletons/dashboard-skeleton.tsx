import { PageContent } from "@/components/core/page";

import DashboardCountsSkeleton from "./dashboard-counts-skeleton";
import { LatestNotesSkeleton } from "./latest-notes-skeleton";
import LatestResearchesSkeleton from "./latest-researches-skeleton";
import LatestSourcesSkeleton from "./latest-sources-skeleton";

export default function DashboardSkeleton() {
  return (
    <>
      <DashboardCountsSkeleton />

      <PageContent>
        <div className="grid gap-4 lg:grid-cols-2">
          <LatestResearchesSkeleton />
          <LatestResearchesSkeleton />
          <LatestSourcesSkeleton />
          <LatestNotesSkeleton />
        </div>
      </PageContent>
    </>
  );
}
