"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/coss/ui/dialog";
import { type Note } from "@/generated/prisma/client";

import UpdateNoteForm from "./update-note-form";

type UpdateNoteDialogProps = {
  note: Pick<Note, "id" | "content">;
  researchId: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function UpdateNoteDialog({
  note,
  researchId,
  open,
  onOpenChange,
}: UpdateNoteDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>Update this note.</DialogDescription>
        </DialogHeader>

        <UpdateNoteForm
          note={note}
          researchId={researchId}
          onSuccess={() => {
            onOpenChange(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
