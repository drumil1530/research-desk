"use server";

import z from "zod";

import { Prisma } from "@/generated/prisma/client";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { type UpdateResearchInput, updateResearchSchema } from "../schemas";
import { type ResearchActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.research.update>>;

type ActionResult = Promise<Result<Response, ResearchActionError<UpdateResearchInput>>>;

export default async function updateResearch(input: UpdateResearchInput): ActionResult {
  const result = updateResearchSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { id, title, description } = result.data;
  const { id: userId } = await authService.getUserOrRedirect();

  try {
    const response = await service.research.update({
      id,
      userId,
      title,
      description,
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
