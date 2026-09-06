"use server";

import z from "zod";

import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { type UpdateNoteInput, updateNoteSchema } from "../schemas";
import { type NoteActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.note.update>>;

type ActionResult = Promise<Result<Response, NoteActionError<UpdateNoteInput>>>;

export default async function updateNote(input: UpdateNoteInput): ActionResult {
  const result = updateNoteSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { noteId, researchId, content } = result.data;
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

  const response = await service.note.update({
    noteId,
    researchId,
    content,
  });

  return {
    success: true,
    data: response,
  };
}
