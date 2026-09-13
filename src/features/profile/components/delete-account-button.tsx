"use client";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/coss/ui/alert-dialog";
import { Button } from "@/coss/ui/button";

import deleteUser from "../actions/delete-user";

export default function DeleteAccountButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete account
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete your account and all of your research, sources, and notes.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter variant="bare">
          <AlertDialogClose render={<Button variant="outline" />}>Cancel</AlertDialogClose>

          <form action={deleteUser}>
            <Button type="submit" variant="destructive">
              Delete account
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
