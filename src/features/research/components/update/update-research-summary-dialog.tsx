"use client";

import { Pencil, Plus } from "lucide-react";
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

import UpdateResearchSummaryForm from "./update-research-summary-form";

type UpdateResearchSummaryDialogProps = {
  researchId: string;
  summary: string | null;
};

export default function UpdateResearchSummaryDialog({
  researchId,
  summary,
}: UpdateResearchSummaryDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        {summary ? (
          <>
            <Pencil />
            Edit
          </>
        ) : (
          <>
            <Plus /> Add
          </>
        )}
      </DialogTrigger>

      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{summary ? "Update" : "Add"} summary</DialogTitle>
          <DialogDescription>
            {summary
              ? "Update the details of your research."
              : "Capture the key findings and conclusions from your research."}
          </DialogDescription>
        </DialogHeader>

        <UpdateResearchSummaryForm
          researchId={researchId}
          summary={summary}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
