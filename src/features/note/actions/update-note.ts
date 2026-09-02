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

  const { id, researchId, content, sourceId } = result.data;
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

  if (sourceId) {
    const sourceBelongsToResearch = await service.source.belongsToResearch({
      id: sourceId,
      researchId,
    });

    if (!sourceBelongsToResearch) {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "Requested Source not found.",
        },
      };
    }
  }

  const response = await service.note.update({
    id,
    researchId,
    sourceId,
    content,
  });

  return {
    success: true,
    data: response,
  };
}
