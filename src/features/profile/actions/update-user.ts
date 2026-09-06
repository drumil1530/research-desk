"use server";

import { APIError } from "better-auth";
import z from "zod";

import { type AuthActionError } from "@/features/auth/types";
import { authService } from "@/infrastructure/auth";
import { type Result } from "@/shared/types/result";

import { type UpdateUserInput, updateUserSchema } from "../schemas";

type ActionResult = Promise<Result<void, AuthActionError<UpdateUserInput>>>;

export default async function updateUser(input: UpdateUserInput): ActionResult {
  const result = updateUserSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: {
        type: "validation",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
    };
  }

  try {
    await authService.updateUser(result.data);

    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: {
          type: "auth",
          message: error.message,
        },
      };
    }

    throw error;
  }
}
