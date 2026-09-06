import { Dot } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Page,
  PageActions,
  PageBreadcrumb,
  PageContent,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import { Button } from "@/coss/ui/button";
import { Card, CardContent } from "@/coss/ui/card";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/coss/ui/menu";
import { researchIdSchema } from "@/features/research/schemas";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import CreateNoteDialog from "../create/create-note-dialog";

import NoteActions from "./note-action";
import NoteEmpty from "./note-empty";

type NoteListProps = {
  params: PageProps<"/researches/[researchId]/notes">["params"];
};

export default async function ResearchNoteList({ params }: NoteListProps) {
  const { id: userId } = await authService.getUserOrRedirect();
  const { researchId } = await params;

  const result = researchIdSchema.safeParse(researchId);
  if (!result.success) notFound();

  const research = await service.research.noteList({ researchId: result.data, userId });
  if (!research) notFound();

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
            page: (
              <Menu>
                <MenuTrigger
                  render={
                    <Button
                      className="-mx-1.25 -my-1.5 sm:-ms-2 text-sm h-6 px-1 sm:px-2"
                      variant="ghost"
                      size="sm"
                    />
                  }
                >
                  Notes
                </MenuTrigger>
                <MenuPopup align="start">
                  <MenuItem
                    render={<Link href={ROUTES.research(researchId).sources} />}
                    className="cursor-pointer text-sm"
                  >
                    Sources
                  </MenuItem>
                </MenuPopup>
              </Menu>
            ),
          },
        ]}
      />

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
