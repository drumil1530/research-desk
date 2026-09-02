import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import z from "zod";

import {
  Page,
  PageActions,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import { Badge } from "@/coss/ui/badge";
import { CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import CreateNoteDialog from "@/features/note/components/create/create-note-dialog";
import SourceNoteList from "@/features/note/components/list/source-note-list";
import { researchIdSchema } from "@/features/research/schemas";
import { sourceTypes } from "@/features/source/contants";
import { sourceIdSchema } from "@/features/source/schemas";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

import SourceActions from "../list/source-action";

type SourceDetailProps = {
  params: PageProps<"/research/[researchId]/sources/[sourceId]">["params"];
};

export default async function SourceDetail({ params }: SourceDetailProps) {
  const { id: userId } = await authService.getUserOrRedirect();

  const result = z
    .object({
      researchId: researchIdSchema,
      sourceId: sourceIdSchema,
    })
    .safeParse(await params);

  if (!result.success) notFound();

  const source = await service.source.getById({
    id: result.data.sourceId,
    researchId: result.data.researchId,
    userId,
  });

  if (!source) notFound();

  return (
    <Page>
      <PageHeader className="flex-row gap-2 items-start">
        <div className="flex flex-wrap items-center justify-between gap-2 grow">
          <PageTitle>{source.title}</PageTitle>

          <Badge>
            {sourceTypes.find((type) => type.value === source.type)?.label || source.type}
          </Badge>
        </div>

        <PageActions>
          <SourceActions source={source} />
        </PageActions>
      </PageHeader>

      <PageContent>
        <div className="space-y-3">
          {source.description && <PageDescription>{source.description}</PageDescription>}

          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-2 text-sm text-muted-foreground border-b border-transparent hover:border-current transition-[border-color]"
          >
            <span className="truncate">{source.url}</span>
            <ExternalLink className="size-4 shrink-0" />
          </a>
        </div>
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader className="p-4 md:py-4">
            <CardFrameTitle>
              Notes {source._count.notes > 0 && `(${source._count.notes})`}
            </CardFrameTitle>

            <CardFrameAction>
              <CreateNoteDialog researchId={source.researchId} sourceId={source.id} />
            </CardFrameAction>
          </CardFrameHeader>

          <SourceNoteList notes={source.notes} researchId={source.researchId} />
        </CardFrame>
      </PageContent>
    </Page>
  );
}
