import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import z from "zod";

import {
  Page,
  PageActions,
  PageBreadcrumb,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import { Badge } from "@/coss/ui/badge";
import { BreadcrumbEllipsis } from "@/coss/ui/breadcrumb";
import { Button } from "@/coss/ui/button";
import { CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/coss/ui/menu";
import CreateNoteDialog from "@/features/note/components/create/create-note-dialog";
import SourceNoteList from "@/features/note/components/list/source-note-list";
import { researchIdSchema } from "@/features/research/schemas";
import { sourceTypes } from "@/features/source/contants";
import { sourceIdSchema } from "@/features/source/schemas";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import SourceActions from "../list/source-action";

type SourceDetailProps = {
  params: PageProps<"/researches/[researchId]/sources/[sourceId]">["params"];
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

  const response = await service.source.getById({
    id: result.data.sourceId,
    researchId: result.data.researchId,
    userId,
  });

  if (!response) notFound();

  const { research, notes, ...source } = response;

  return (
    <Page>
      <PageBreadcrumb
        items={[
          { label: "Researches", href: ROUTES.researchList },
          {
            label: research.title,
            href: ROUTES.research(research.id).detail,
          },
          {
            label: (
              <Menu>
                <MenuTrigger
                  render={
                    <Button
                      className="-m-1.5 text-muted-foreground"
                      size="icon-sm"
                      variant="ghost"
                    />
                  }
                >
                  <BreadcrumbEllipsis />
                </MenuTrigger>
                <MenuPopup align="start">
                  <MenuItem
                    render={<Link href={ROUTES.research(research.id).sources} />}
                    className="cursor-pointer"
                  >
                    Source
                  </MenuItem>
                  <MenuItem
                    render={<Link href={ROUTES.research(research.id).notes} />}
                    className="cursor-pointer"
                  >
                    Notes
                  </MenuItem>
                </MenuPopup>
              </Menu>
            ),
          },
          { page: source.title },
        ]}
      />

      <PageHeader className="flex-row gap-1 items-start">
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
          <CardFrameHeader className="**:data-[slot='dialog-trigger']:h-7.25 py-3 pe-2.5 sm:pe-4">
            <CardFrameTitle>
              Notes {source._count.notes > 0 && `(${source._count.notes})`}
            </CardFrameTitle>

            <CardFrameAction>
              <CreateNoteDialog researchId={research.id} sourceId={source.id} />
            </CardFrameAction>
          </CardFrameHeader>

          <SourceNoteList notes={notes} researchId={research.id} />
        </CardFrame>
      </PageContent>
    </Page>
  );
}
