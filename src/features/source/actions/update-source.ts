"use server";

import z from "zod";

import { Prisma } from "@/generated/prisma/client";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { type UpdateSourceInput, updateSourceSchema } from "../schemas";
import { type SourceActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.source.update>>;

type ActionResult = Promise<Result<Response, SourceActionError<UpdateSourceInput>>>;

export default async function updateSource(input: UpdateSourceInput): ActionResult {
  const result = updateSourceSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { sourceId, researchId, title, url, description, type } = result.data;
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
    const response = await service.source.update({
      sourceId,
      researchId,
      title,
      url,
      description,
      type,
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
          message: "Source not found.",
        },
      };
    }

    throw error;
  }
}
