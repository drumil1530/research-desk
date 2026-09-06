"use client";

import { BookOpen } from "lucide-react";
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
import reopenResearch from "@/features/research/actions/reopen-research";

type ReopenResearchDialogProps = {
  researchId: string;
};

export default function ReopenResearchDialog({ researchId }: ReopenResearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [isReOpening, setIsReOpening] = useState(false);
  const router = useRouter();

  async function onReopen() {
    setIsReOpening(true);
    const result = await reopenResearch({ researchId });

    if (!result.success) {
      setIsReOpening(false);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="outline">
            <BookOpen />
            Reopen
          </Button>
        }
      />

      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Reopen Research?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the research as active again. Your sources, notes, and summary will be
            preserved.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter variant="bare">
          <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>

          <Button loading={isReOpening} onClick={onReopen}>
            Reopen
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
