import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";

import {
  Page,
  PageHeader,
  PageContent,
  PageTitle,
  PageActions,
  PageBreadcrumb,
} from "@/components/core/page";
import ViewAllLink from "@/components/utility/view-all-link";
import { Badge } from "@/coss/ui/badge";
import {
  Card,
  CardFrame,
  CardFrameAction,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@/coss/ui/card";
import CreateNoteDialog from "@/features/note/components/create/create-note-dialog";
import { researchIdSchema } from "@/features/research/schemas";
import CreateSourceDialog from "@/features/source/components/create/create-source-dialog";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import CompleteResearchDialog from "../complete/complete-research-dialog";
import DeleteResearchDialog from "../delete/delete-research-dialog";
import ReopenResearchDialog from "../reopen/reopen-research-dialog";
import UpdateResearchDialog from "../update/update-research-dialog";
import UpdateResearchSummaryDialog from "../update/update-research-summary-dialog";

import NoteListPreview from "./notes-list-preview";
import { ResearchSummaryEmpty } from "./research-summary-empty";
import SourceListPreview from "./source-list-preview";

type ResearchDetailProps = {
  params: PageProps<"/researches/[researchId]">["params"];
};

export default async function ResearchDetail({ params }: ResearchDetailProps) {
  const { id: userId } = await authService.getUserOrRedirect();
  const { researchId } = await params;

  const result = researchIdSchema.safeParse(researchId);
  if (!result.success) notFound();

  const research = await service.research.getById({ researchId: result.data, userId });
  if (!research) notFound();

  const notesCount = research._count.notes;
  const sourcesCount = research._count.sources;

  return (
    <Page>
      <PageBreadcrumb
        items={[{ label: "Researches", href: ROUTES.researchList }, { page: research.title }]}
      />
      <PageHeader>
        <PageTitle>{research.title}</PageTitle>

        <PageActions>
          <UpdateResearchDialog
            researchId={research.id}
            title={research.title}
            description={research.description}
          />

          {research.status === "ACTIVE" ? (
            <CompleteResearchDialog researchId={research.id} summary={research.summary} />
          ) : (
            <ReopenResearchDialog researchId={research.id} />
          )}

          <DeleteResearchDialog researchId={research.id} />
        </PageActions>
      </PageHeader>

      <PageContent>
        {research.description && <p className="whitespace-pre-wrap">{research.description}</p>}

        <div className="flex items-center justify-between gap-2 mt-4">
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
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader className="**:data-[slot='dialog-trigger']:h-7.25 has-[&_[data-slot='dialog-trigger']]:py-3">
            <CardFrameTitle>Sources {sourcesCount > 0 && `(${sourcesCount})`}</CardFrameTitle>

            <CardFrameAction>
              {sourcesCount > 0 ? (
                <ViewAllLink link={ROUTES.research(research.id).sources} />
              ) : (
                <CreateSourceDialog researchId={research.id} />
              )}
            </CardFrameAction>
          </CardFrameHeader>

          <Card>
            <SourceListPreview sources={research.sources} researchId={research.id} />
          </Card>
        </CardFrame>
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader className="**:data-[slot='dialog-trigger']:h-7.25 has-[&_[data-slot='dialog-trigger']]:py-3">
            <CardFrameTitle>Notes {notesCount > 0 && `(${notesCount})`}</CardFrameTitle>

            <CardFrameAction>
              {notesCount > 0 ? (
                <ViewAllLink link={ROUTES.research(research.id).notes} />
              ) : (
                <CreateNoteDialog researchId={research.id} sourceId={null} />
              )}
            </CardFrameAction>
          </CardFrameHeader>

          <Card>
            <NoteListPreview notes={research.notes} />
          </Card>
        </CardFrame>
      </PageContent>

      <PageContent>
        <CardFrame>
          <CardFrameHeader className="**:data-[slot='dialog-trigger']:h-7.25 has-[&_[data-slot='dialog-trigger']]:py-3">
            <CardFrameTitle className="self-start">Summary</CardFrameTitle>

            <CardFrameAction>
              <UpdateResearchSummaryDialog researchId={research.id} summary={research.summary} />
            </CardFrameAction>
          </CardFrameHeader>

          <Card>
            {research.summary ? (
              <CardPanel>
                <p className="whitespace-pre-wrap">{research.summary}</p>
              </CardPanel>
            ) : (
              <ResearchSummaryEmpty />
            )}
          </Card>

          {research.completedAt && (
            <CardFrameFooter>
              <time
                className="text-muted-foreground text-sm"
                dateTime={research.completedAt.toISOString()}
              >
                Completed {formatDistanceToNow(research.completedAt, { addSuffix: true })}
              </time>
            </CardFrameFooter>
          )}
        </CardFrame>
      </PageContent>
    </Page>
  );
}
