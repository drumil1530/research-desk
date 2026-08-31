"use server";

import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import z from "zod";

import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";
import { type Result } from "@/shared/types/result";

import { signUpSchema, type SignUpInput } from "../schema";
import type { AuthActionError } from "../types";

type ActionResult = Promise<Result<void, AuthActionError<SignUpInput>>>;

export async function signUp(input: SignUpInput): ActionResult {
  const result = signUpSchema.safeParse(input);

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
    await authService.signUp(result.data);
  } catch (error) {
    if (error instanceof APIError && error.status === "UNPROCESSABLE_ENTITY") {
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

  redirect(appRoutes.home);
}
