"use server";

import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";
import { redirect } from "next/navigation";

export async function signOut() {
  await authService.signOut();
  redirect(appRoutes.auth.signIn);
}
