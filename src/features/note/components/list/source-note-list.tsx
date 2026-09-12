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
    <Card className="p-4 md:py-3 md:px-6">
      {notes.map((note) => (
        <div key={note.id} className="flex gap-1 py-1.5 -ms-2">
          <Dot className="size-6 shrink-0 -mt-0.5" />
          <p className="min-w-0 flex-1 whitespace-pre-wrap text-sm">{note.content}</p>

          <NoteActions note={note} researchId={researchId} />
        </div>
      ))}
    </Card>
  );
}
