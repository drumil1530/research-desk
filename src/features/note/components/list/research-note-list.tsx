import { Dot } from "lucide-react";
import { notFound } from "next/navigation";

import { Page, PageActions, PageContent, PageHeader, PageTitle } from "@/components/core/page";
import { Card, CardContent } from "@/coss/ui/card";
import { researchIdSchema } from "@/features/research/schemas";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

import CreateNoteDialog from "../create/create-note-dialog";

import NoteActions from "./note-action";
import NoteEmpty from "./note-empty";

type NoteListProps = {
  params: PageProps<"/research/[researchId]/notes">["params"];
};

export default async function ResearchNoteList({ params }: NoteListProps) {
  const { id: userId } = await authService.getUserOrRedirect();
  const { researchId } = await params;

  const result = researchIdSchema.safeParse(researchId);
  if (!result.success) notFound();

  const research = await service.research.noteList({ id: result.data, userId });
  if (!research) notFound();

  return (
    <Page>
      <PageHeader className="flex-row justify-between items-center">
        <PageTitle>Notes ({research._count.notes})</PageTitle>

        <PageActions>
          <CreateNoteDialog researchId={research.id} sourceId={null} />
        </PageActions>
      </PageHeader>
      <PageContent className="flex flex-col gap-2">
        {research.notes.length === 0 ? (
          <Card>
            <NoteEmpty />
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4 md:py-4">
              {research.notes.map((note) => (
                <div key={note.id} className="flex gap-2 py-3 -ms-2">
                  <Dot className="size-6 shrink-0" />
                  <p className="min-w-0 flex-1 whitespace-pre-wrap text-sm leading-relaxed">
                    {note.content}
                  </p>

                  <NoteActions note={note} researchId={research.id} />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </PageContent>
    </Page>
  );
}
