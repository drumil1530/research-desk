import { Suspense } from "react";

import { authService } from "@/infrastructure/auth";

import DashboardCounts from "./dashboard-counts";
import LatestActiveResearches from "./latest-active-researches";
import LatestCompletedResearches from "./latest-completed-researches";
import LatestUpdatedNotes from "./latest-updated-notes";
import LatestUpdatedSources from "./latest-updated-sources";
import DashboardCountsSkeleton from "./skeletons/dashboard-counts-skeleton";
import { LatestNotesSkeleton } from "./skeletons/latest-notes-skeleton";
import LatestResearchesSkeleton from "./skeletons/latest-researches-skeleton";
import LatestSourcesSkeleton from "./skeletons/latest-sources-skeleton";

export default async function DashboardSections() {
  const { id: userId } = await authService.getUserOrRedirect();

  return (
    <>
      <Suspense fallback={<DashboardCountsSkeleton />}>
        <DashboardCounts userId={userId} />
      </Suspense>

      {/* Desktop */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-2">
        <div className="grid content-start gap-4">
          <Suspense fallback={<LatestResearchesSkeleton />}>
            <LatestActiveResearches userId={userId} />
          </Suspense>

          <Suspense fallback={<LatestSourcesSkeleton />}>
            <LatestUpdatedSources userId={userId} />
          </Suspense>
        </div>

        <div className="grid content-start gap-4">
          <Suspense fallback={<LatestResearchesSkeleton />}>
            <LatestCompletedResearches userId={userId} />
          </Suspense>

          <Suspense fallback={<LatestNotesSkeleton />}>
            <LatestUpdatedNotes userId={userId} />
          </Suspense>
        </div>
      </div>

      {/* Mobile */}
      <div className="grid gap-4 lg:hidden">
        <Suspense fallback={<LatestResearchesSkeleton />}>
          <LatestActiveResearches userId={userId} />
        </Suspense>

        <Suspense fallback={<LatestResearchesSkeleton />}>
          <LatestCompletedResearches userId={userId} />
        </Suspense>

        <Suspense fallback={<LatestSourcesSkeleton />}>
          <LatestUpdatedSources userId={userId} />
        </Suspense>

        <Suspense fallback={<LatestNotesSkeleton />}>
          <LatestUpdatedNotes userId={userId} />
        </Suspense>
      </div>
    </>
  );
}
