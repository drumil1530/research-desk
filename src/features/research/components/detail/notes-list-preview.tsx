import { Dot } from "lucide-react";

import NoteEmpty from "@/features/note/components/list/note-empty";
import { type Note } from "@/generated/prisma/client";

type NoteListPreviewProps = {
  notes: Pick<Note, "id" | "content">[];
};

export default function NoteListPreview({ notes }: NoteListPreviewProps) {
  if (notes.length === 0) return <NoteEmpty />;

  return (
    <div className="flex flex-col gap-2 px-4 py-3 md:px-6 -ms-2">
      {notes.map((note) => (
        <div key={note.id} className="flex gap-1 py-1.5">
          <Dot className="size-6 shrink-0 -mt-0.5" />
          <p className="min-w-0 line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
        </div>
      ))}
    </div>
  );
}
