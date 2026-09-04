import { Dot } from "lucide-react";

import NoteEmpty from "@/features/note/components/list/note-empty";

type NoteListPreviewProps = {
  notes: {
    id: string;
    content: string;
  }[];
};

export default function NoteListPreview({ notes }: NoteListPreviewProps) {
  if (notes.length === 0) return <NoteEmpty />;

  return (
    <div className="flex flex-col gap-2 p-4 md:px-6 -ms-2">
      {notes.map((note) => (
        <div key={note.id} className="flex gap-2">
          <Dot className="size-6 shrink-0" />
          <p className="min-w-0 line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
        </div>
      ))}
    </div>
  );
}
