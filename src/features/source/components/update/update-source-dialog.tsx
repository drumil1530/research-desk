"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/coss/ui/dialog";
import { type Source } from "@/generated/prisma/client";

import UpdateSourceForm from "./update-source-form";

type UpdateSourceDialogProps = {
  source: Source;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

export default function UpdateSourceDialog({
  source,
  open,
  onOpenChange,
}: UpdateSourceDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Source</DialogTitle>
          <DialogDescription>Update this source.</DialogDescription>
        </DialogHeader>

        <UpdateSourceForm
          source={source}
          onSuccess={() => {
            onOpenChange(false);
            router.refresh();
          }}
        />
      </DialogPopup>
    </Dialog>
  );
}
