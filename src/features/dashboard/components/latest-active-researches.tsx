import Link from "next/link";

import ViewAllLink from "@/components/utility/view-all-link";
import { Card, CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import { LatestActiveResearchesEmpty } from "./empty/dashboard-empty";

type LatestActiveResearchesProps = {
  userId: string;
};

export default async function LatestActiveResearches({ userId }: LatestActiveResearchesProps) {
  const researches = await service.research.getLatestActive({ userId });

  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>Latest Active Researches</CardFrameTitle>

        <CardFrameAction>
          <ViewAllLink link={ROUTES.researchList} />
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
          <LatestActiveResearchesEmpty link={ROUTES.researchList} />
        )}
      </Card>
    </CardFrame>
  );
}
