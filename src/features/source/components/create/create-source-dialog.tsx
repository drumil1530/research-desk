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
import ROUTES from "@/shared/routes";

import CreateSourceForm from "./create-source-form";

type CreateSourceDialogProps = {
  researchId: string;
};

export default function CreateSourceDialog({ researchId }: CreateSourceDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Plus /> Add
      </DialogTrigger>

      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Source</DialogTitle>
          <DialogDescription>Add a source to this research.</DialogDescription>
        </DialogHeader>

        <CreateSourceForm
          researchId={researchId}
          onSuccess={(sourceId: string) => {
            setOpen(false);
            router.push(ROUTES.research(researchId).source(sourceId));
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
