import { Dot } from "lucide-react";

import { Card } from "@/coss/ui/card";
import { type service } from "@/infrastructure/database";

import NoteActions from "./note-action";
import NoteEmpty from "./note-empty";

type SourceNoteListProps = {
  researchId: string;
  notes: NonNullable<Awaited<ReturnType<typeof service.source.getById>>>["notes"];
};

export default async function SourceNoteList({ researchId, notes }: SourceNoteListProps) {
  return notes.length === 0 ? (
    <Card>
      <NoteEmpty />
    </Card>
  ) : (
    <Card className="p-4 md:py-4 md:px-6">
      {notes.map((note) => (
        <div key={note.id} className="flex gap-2 py-3 -ms-2">
          <Dot className="size-6 shrink-0" />
          <p className="min-w-0 flex-1 whitespace-pre-wrap text-sm leading-relaxed">
            {note.content}
          </p>

          <NoteActions note={note} researchId={researchId} />
        </div>
      ))}
    </Card>
  );
}
