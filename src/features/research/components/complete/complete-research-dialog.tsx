"use client";

import { Check } from "lucide-react";
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

import CompleteResearchForm from "./complete-research-form";

type CompleteResearchDialogProps = {
  researchId: string;
  summary: string | null;
};

export default function CompleteResearchDialog({
  researchId,
  summary,
}: CompleteResearchDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Check />
        Complete
      </DialogTrigger>

      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Complete research?</DialogTitle>
          <DialogDescription>
            Mark this research as completed once you&apos;re satisfied with your findings and
            summary.
          </DialogDescription>
        </DialogHeader>

        <CompleteResearchForm
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
