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
import deleteSource from "@/features/source/actions/delete-source";

type DeleteSourceDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  sourceId: string;
  researchId: string;
};

export default function DeleteSourceDialog({
  open,
  onOpenChange,
  sourceId,
  researchId,
}: DeleteSourceDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function onDelete() {
    setIsDeleting(true);
    const result = await deleteSource({ sourceId, researchId });

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
          <AlertDialogTitle>Delete Source?</AlertDialogTitle>
          <AlertDialogDescription>
            This Source will be permanently deleted. This action cannot be undone. Any notes
            associated with this Source will remain, but will no longer reference it.
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
