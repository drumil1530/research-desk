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
  id: string;
};

export default function CompleteResearchDialog({ id }: CompleteResearchDialogProps) {
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
          <DialogTitle>Complete Research</DialogTitle>
          <DialogDescription>Write a final summary of what you learned.</DialogDescription>
        </DialogHeader>

        <CompleteResearchForm
          id={id}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
