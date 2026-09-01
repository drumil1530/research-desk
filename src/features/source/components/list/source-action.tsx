"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/coss/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/coss/ui/menu";
import { type Source } from "@/generated/prisma/client";

import DeleteSourceDialog from "../delete/delete-source-dialog";
import UpdateSourceDialog from "../update/update-source-dialog";

type SourceActionsProps = {
  source: Source;
};

export default function SourceActions({ source }: SourceActionsProps) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Source actions"
              className="-mr-1.5"
            />
          }
        >
          <MoreHorizontal />
        </MenuTrigger>

        <MenuPopup align="end">
          <MenuItem onClick={() => setUpdateOpen(true)}>
            <Pencil />
            Edit
          </MenuItem>

          <MenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>

      <UpdateSourceDialog open={updateOpen} onOpenChange={setUpdateOpen} source={source} />

      <DeleteSourceDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        id={source.id}
        researchId={source.researchId}
      />
    </>
  );
}
