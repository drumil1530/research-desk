"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/coss/ui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/coss/ui/menu";
import { type Note } from "@/generated/prisma/client";

import DeleteNoteDialog from "../delete/delete-note-dialog";
import UpdateNoteDialog from "../update/update-note-dialog";

type NoteActionsProps = {
  note: Pick<Note, "id" | "content">;
  researchId: string;
};

export default function NoteActions({ note, researchId }: NoteActionsProps) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Note actions" className="-mr-1.5" />
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

      <UpdateNoteDialog
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        note={note}
        researchId={researchId}
      />

      <DeleteNoteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        noteId={note.id}
        researchId={researchId}
      />
    </>
  );
}
