"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/coss/ui/alert-dialog";
import { Button } from "@/coss/ui/button";
import deleteNote from "@/features/note/actions/delete-note";

type DeleteNoteDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  noteId: string;
  researchId: string;
};

export default function DeleteNoteDialog({
  open,
  onOpenChange,
  noteId,
  researchId,
}: DeleteNoteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function onDelete() {
    setIsDeleting(true);
    const result = await deleteNote({ noteId, researchId });

    if (!result.success) {
      setIsDeleting(false);
      // We'll handle this once we decide how
      // destructive-action errors should be displayed.
      return;
    }

    onOpenChange(false);
    router.refresh();
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Note?</AlertDialogTitle>
          <AlertDialogDescription>
            This Note will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter variant="bare">
          <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>

          <Button loading={isDeleting} onClick={onDelete} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
