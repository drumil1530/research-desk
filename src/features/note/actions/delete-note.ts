"use server";

import z from "zod";

import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { type DeleteNoteInput, deleteNoteSchema } from "../schemas";
import { type NoteActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.note.delete>>;

type ActionResult = Promise<Result<Response, NoteActionError<DeleteNoteInput>>>;

export default async function deleteNote(input: DeleteNoteInput): ActionResult {
  const result = deleteNoteSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { noteId, researchId } = result.data;
  const { id: userId } = await authService.getUserOrRedirect();

  const isOwner = await service.research.isOwnedBy({
    researchId,
    userId,
  });

  if (!isOwner) {
    return {
      success: false,
      error: {
        type: "notFound",
        message: "Requested Research not found.",
      },
    };
  }

  const response = await service.note.delete({
    noteId,
    researchId,
  });

  return {
    success: true,
    data: response,
  };
}
