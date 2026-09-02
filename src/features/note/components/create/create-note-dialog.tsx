"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/coss/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/coss/ui/dialog";

import CreateNoteForm from "./create-note-form";

type CreateNoteDialogProps = {
  researchId: string;
  sourceId: string | null;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

export default function CreateNoteDialog({
  researchId,
  sourceId,
  open: intialOpen,
  onOpenChange,
}: CreateNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={intialOpen || open} onOpenChange={onOpenChange || setOpen}>
      {!intialOpen && !onOpenChange && (
        <DialogTrigger render={<Button variant="outline" />}>
          <Plus /> Add
        </DialogTrigger>
      )}

      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>Add a note to this research.</DialogDescription>
        </DialogHeader>

        <CreateNoteForm
          researchId={researchId}
          sourceId={sourceId}
          onSuccess={() => {
            if (onOpenChange) onOpenChange(false);
            else setOpen(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
