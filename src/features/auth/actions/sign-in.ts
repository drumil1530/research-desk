"use server";

import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";
import { Result } from "@/shared/types/result";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";
import z from "zod";
import { SignInInput, signInSchema } from "../schemas/auth.schema";
import { AuthActionError } from "../types/auth.types";

type ActionResult = Promise<Result<void, AuthActionError<SignInInput>>>;

export async function signIn(input: SignInInput): ActionResult {
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

  redirect(appRoutes.research.list);
}
