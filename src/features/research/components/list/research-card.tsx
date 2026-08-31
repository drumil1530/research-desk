import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Badge } from "@/coss/ui/badge";
import { Card, CardHeader, CardTitle, CardAction, CardPanel } from "@/coss/ui/card";
import { type service } from "@/infrastructure/database";

type ResearchCardProps = {
  research: Awaited<ReturnType<typeof service.research.list>>[number];
};

export default function ResearchCard({ research }: ResearchCardProps) {
  return (
    <Card
      className="transition-colors hover:bg-muted/50"
      render={<Link href={`/research/${research.id}`} />}
    >
      <CardHeader>
        <CardTitle>{research.title}</CardTitle>

        <CardAction>
          <Badge variant={research.status === "ACTIVE" ? "default" : "secondary"}>
            {research.status === "ACTIVE" ? "Active" : "Completed"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardPanel className="grid gap-2">
        {research.description && (
          <p className="line-clamp-1 text-muted-foreground">{research.description}</p>
        )}

        <time className="text-muted-foreground text-sm" dateTime={research.updatedAt.toISOString()}>
          Updated {formatDistanceToNow(research.updatedAt, { addSuffix: true })}
        </time>
      </CardPanel>
    </Card>
  );
}
