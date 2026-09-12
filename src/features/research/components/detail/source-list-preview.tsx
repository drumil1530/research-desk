import Link from "next/link";

import { Badge } from "@/coss/ui/badge";
import { SourceEmpty } from "@/features/source/components/list/source-empty";
import { sourceTypes } from "@/features/source/contants";
import { type service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

type SourceListPreviewProps = {
  researchId: string;
  sources: NonNullable<Awaited<ReturnType<typeof service.research.getById>>>["sources"];
};

export default function SourceListPreview({ researchId, sources }: SourceListPreviewProps) {
  if (sources.length === 0) return <SourceEmpty />;

  return (
    <div className="flex flex-col gap-2 p-4 md:px-6">
      {sources.map((source) => (
        <div key={source.id} className="flex justify-between items-center gap-2 py-1">
          <h3 className="min-w-0 truncate text-sm font-medium">
            <Link
              href={ROUTES.research(researchId).source(source.id)}
              className="hover:underline underline-offset-4"
            >
              {source.title}
            </Link>
          </h3>

          <Badge variant="outline" size="sm" className="text-muted-foreground rounded-md">
            {sourceTypes.find((type) => type.value === source.type)?.label || source.type}
          </Badge>
        </div>
      ))}
    </div>
  );
}
