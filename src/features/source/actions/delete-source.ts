"use server";

import z from "zod";

import { Prisma } from "@/generated/prisma/client";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { type DeleteSourceInput, deleteSourceSchema } from "../schemas";
import { type SourceActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.source.delete>>;

type ActionResult = Promise<Result<Response, SourceActionError<DeleteSourceInput>>>;

export default async function deleteSource(input: DeleteSourceInput): ActionResult {
  const result = deleteSourceSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { id, researchId } = result.data;
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

  try {
    const response = await service.source.delete({
      id,
      researchId,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return {
        success: false,
        error: {
          type: "notFound",
          message: "Research not found.",
        },
      };
    }

    throw error;
  }
}
