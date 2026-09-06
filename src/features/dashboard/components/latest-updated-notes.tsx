import Link from "next/link";

import { Card, CardFrame, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import { LatestUpdatedNotesEmpty } from "./empty/dashboard-empty";

type LatestUpdatedNotesProps = {
  userId: string;
};

export default async function LatestUpdatedNotes({ userId }: LatestUpdatedNotesProps) {
  const notes = await service.note.getLatestUpdated({ userId });

  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle className="self-start">Latest Updated Notes</CardFrameTitle>
      </CardFrameHeader>

      <Card>
        {notes.length > 0 ? (
          <div className="flex flex-col divide-y">
            {notes.map((note) => {
              const href = note.sourceId
                ? ROUTES.research(note.researchId).source(note.sourceId)
                : ROUTES.research(note.researchId).notes;

              return (
                <Link
                  key={note.id}
                  href={href}
                  className="px-4 py-3 text-sm hover:bg-muted/50 md:px-6"
                >
                  <p className="line-clamp-2 whitespace-pre-wrap">{note.content}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <LatestUpdatedNotesEmpty />
        )}
      </Card>
    </CardFrame>
  );
}
