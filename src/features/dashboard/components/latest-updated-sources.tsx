import Link from "next/link";

import { Card, CardFrame, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import { LatestUpdatedSourcesEmpty } from "./empty/dashboard-empty";

type LatestUpdatedSourcesProps = {
  userId: string;
};

export default async function LatestUpdatedSources({ userId }: LatestUpdatedSourcesProps) {
  const sources = await service.source.getLatestUpdated({ userId });

  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle className="self-start">Latest Updated Sources</CardFrameTitle>
      </CardFrameHeader>

      <Card>
        {sources.length > 0 ? (
          <div className="flex flex-col divide-y">
            {sources.map((source) => (
              <Link
                key={source.id}
                href={ROUTES.research(source.researchId).source(source.id)}
                className="grid gap-1 px-4 py-3 hover:bg-muted/50 md:px-6"
              >
                <span className="text-sm">{source.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <LatestUpdatedSourcesEmpty />
        )}
      </Card>
    </CardFrame>
  );
}
