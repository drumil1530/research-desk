"use client";

import { Trash2 } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/coss/ui/alert-dialog";
import { Button } from "@/coss/ui/button";
import deleteResearch from "@/features/research/actions/delete-research";
import ROUTES from "@/shared/routes";

type DeleteResearchDialogProps = {
  id: string;
};

export default function DeleteResearchDialog({ id }: DeleteResearchDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function onDelete() {
    setIsDeleting(true);
    const result = await deleteResearch({ id });

    if (!result.success) {
      setIsDeleting(false);
      // We'll handle this once we decide how
      // destructive-action errors should be displayed.
      return;
    }

    router.push(ROUTES.researchList);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive-outline">
            <Trash2 />
            Delete
          </Button>
        }
      />

      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Research?</AlertDialogTitle>
          <AlertDialogDescription>
            This research and all of its data will be permanently deleted. This action cannot be
            undone.
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
