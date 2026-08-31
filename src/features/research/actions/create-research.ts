"use server";

import z from "zod";

import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { createResearchSchema, type CreateResearchInput } from "../schemas";
import { type ResearchActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.research.create>>;

type ActionResult = Promise<Result<Response, ResearchActionError<CreateResearchInput>>>;

export default async function createResearch(input: CreateResearchInput): ActionResult {
  const result = createResearchSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { title, description } = result.data;
  const { id: userId } = await authService.getUserOrRedirect();

  const response = await service.research.create({
    userId,
    title,
    description,
  });

  return {
    success: true,
    data: response,
  };
}
