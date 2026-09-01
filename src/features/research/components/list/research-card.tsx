import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Badge } from "@/coss/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/coss/ui/card";
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
        <CardTitle className="text-base sm:text-lg">{research.title}</CardTitle>

        {research.description && (
          <CardDescription className="line-clamp-2">{research.description}</CardDescription>
        )}

        <div className="flex items-center justify-between gap-2 mt-2">
          <time
            className="text-muted-foreground text-sm"
            dateTime={research.updatedAt.toISOString()}
          >
            Updated {formatDistanceToNow(research.updatedAt, { addSuffix: true })}
          </time>

          <Badge variant={research.status === "ACTIVE" ? "default" : "secondary"}>
            {research.status === "ACTIVE" ? "Active" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
