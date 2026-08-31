"use client";

import { Pencil } from "lucide-react";
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

import UpdateResearchForm from "./update-research-form";

type UpdateResearchDialogProps = {
  id: string;
  title: string;
  description: string | null;
};

export default function UpdateResearchDialog({
  id,
  title,
  description,
}: UpdateResearchDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Pencil />
        Edit
      </DialogTrigger>

      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Research</DialogTitle>
          <DialogDescription>Update the details of your research.</DialogDescription>
        </DialogHeader>

        <UpdateResearchForm
          id={id}
          title={title}
          description={description}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
