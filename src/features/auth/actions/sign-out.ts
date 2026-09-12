"use server";

import { redirect } from "next/navigation";

import { authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";

export default async function signOut() {
  await authService.signOut();
  redirect(ROUTES.auth.signIn);
}
