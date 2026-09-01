import { ExternalLinkIcon } from "lucide-react";

import { Badge } from "@/coss/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/coss/ui/card";
import { sourceTypes } from "@/features/source/contants";
import { service } from "@/infrastructure/database";

import SourceActions from "./source-action";
import SourceEmpty from "./source-empty";

type SourceListProps = {
  researchId: string;
};

export default async function SourceList({ researchId }: SourceListProps) {
  const sources = await service.source.list({
    researchId,
  });

  if (sources.length === 0) return <SourceEmpty />;

  return (
    <div className="space-y-0.5 p-0.5">
      {sources.map((source) => (
        <Card key={source.id}>
          <CardHeader className="grid-cols-1">
            <CardTitle
              className="text-base sm:text-lg hover:underline underline-offset-4 leading-relaxed"
              render={<a href={source.url} target="_blank" rel="noopener noreferrer" />}
            >
              {source.title}
              <ExternalLinkIcon className="ml-1 inline size-3.5 opacity-60" />
            </CardTitle>

            {source.description && (
              <CardDescription className="col-span-2 mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                {source.description}
              </CardDescription>
            )}

            <div className="flex items-center justify-between gap-2">
              <Badge variant="secondary">
                {sourceTypes.find((type) => type.value === source.type)?.label || source.type}
              </Badge>
              <SourceActions source={source} />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
