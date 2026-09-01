"use server";

import z from "zod";

import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import { type Result } from "@/shared/types/result";

import { type CreateSourceInput, createSourceSchema } from "../schemas";
import { type SourceActionError } from "../types";

type Response = Awaited<ReturnType<typeof service.source.create>>;

type ActionResult = Promise<Result<Response, SourceActionError<CreateSourceInput>>>;

export default async function createSource(input: CreateSourceInput): ActionResult {
  const result = createSourceSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  const { researchId, title, url, description, type } = result.data;
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

  const response = await service.source.create({
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
}
