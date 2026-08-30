"use server";

import { redirect } from "next/navigation";

import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";

export async function signOut() {
  await authService.signOut();
  redirect(appRoutes.auth.signIn);
}
