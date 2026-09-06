import Link from "next/link";

import ViewAllLink from "@/components/utility/view-all-link";
import { Card, CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import { LatestCompletedResearchesEmpty } from "./empty/dashboard-empty";

type LatestCompletedResearchesProps = {
  userId: string;
};

export default async function LatestCompletedResearches({
  userId,
}: LatestCompletedResearchesProps) {
  const researches = await service.research.getLatestCompleted({ userId });
  const url = `${ROUTES.researchList}?${new URLSearchParams({ status: "completed" })}`;

  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>Latest Completed Researches</CardFrameTitle>

        <CardFrameAction>
          <ViewAllLink link={url} />
        </CardFrameAction>
      </CardFrameHeader>

      <Card>
        {researches.length > 0 ? (
          <div className="flex flex-col divide-y">
            {researches.map((research) => (
              <Link
                key={research.id}
                href={ROUTES.research(research.id).detail}
                className="px-4 py-3 text-sm hover:bg-muted/50 md:px-6"
              >
                {research.title}
              </Link>
            ))}
          </div>
        ) : (
          <LatestCompletedResearchesEmpty link={url} />
        )}
      </Card>
    </CardFrame>
  );
}
