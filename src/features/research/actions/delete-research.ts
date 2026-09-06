"use server";

import z from "zod";

import { Prisma } from "@/generated/prisma/client";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { deleteResearchSchema, type DeleteResearchInput } from "../schemas";
import { type ResearchActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.research.delete>>;

type ActionResult = Promise<Result<Response, ResearchActionError<DeleteResearchInput>>>;

export default async function deleteResearch(input: DeleteResearchInput): ActionResult {
  const result = deleteResearchSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { researchId } = result.data;
  const { id: userId } = await authService.getUserOrRedirect();

  try {
    const response = await service.research.delete({
      researchId,
      userId,
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
