import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Badge } from "@/coss/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/coss/ui/card";
import { sourceTypes } from "@/features/source/contants";
import { type service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

type SourceCardProps = {
  researchId: string;
  source: NonNullable<Awaited<ReturnType<typeof service.research.sourceList>>>["sources"][number];
};

export default function SourceCard({ researchId, source }: SourceCardProps) {
  return (
    <Card
      className="transition-colors hover:bg-muted/50"
      render={<Link href={ROUTES.research(researchId).source(source.id)} />}
    >
      <CardHeader className="grid-cols-1">
        <CardTitle>{source.title}</CardTitle>

        {source.description && (
          <CardDescription className="col-span-2 mt-1 text-sm text-muted-foreground line-clamp-2">
            {source.description}
          </CardDescription>
        )}

        <div className="flex items-center justify-between gap-2">
          <time className="text-muted-foreground text-sm" dateTime={source.updatedAt.toISOString()}>
            Updated {formatDistanceToNow(source.updatedAt, { addSuffix: true })}
          </time>

          <div className="flex items-center gap-1">
            <Badge variant="secondary">
              {sourceTypes.find((type) => type.value === source.type)?.label || source.type}
            </Badge>

            <Badge variant="outline">Notes {source._count.notes}</Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
