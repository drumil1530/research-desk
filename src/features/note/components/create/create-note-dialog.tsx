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
};

export default function CreateNoteDialog({ researchId, sourceId }: CreateNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Plus /> Add
      </DialogTrigger>

      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Add a note to this {sourceId ? "source" : "research"}.
          </DialogDescription>
        </DialogHeader>

        <CreateNoteForm
          researchId={researchId}
          sourceId={sourceId}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
