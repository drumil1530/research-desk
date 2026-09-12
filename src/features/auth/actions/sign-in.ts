"use server";

import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import z from "zod";

import { authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";
import { type Result } from "@/shared/types/result";

import { type SignInInput, signInSchema } from "../schemas";
import { type AuthActionError } from "../types";

type ActionResult = Promise<Result<void, AuthActionError<SignInInput>>>;

export default async function signIn(input: SignInInput): ActionResult {
  const result = signInSchema.safeParse(input);

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
    await authService.signIn(result.data);
  } catch (error) {
    if (error instanceof APIError && error.status === "UNAUTHORIZED") {
      return {
        success: false,
        error: {
          type: "auth",
          message: error.message,
        },
      };
    }
  }

  redirect(ROUTES.dashboard);
}
