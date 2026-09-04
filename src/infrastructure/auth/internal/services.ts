import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ROUTES from "@/shared/routes";

import { auth } from "./auth";
import { type SignInInput, type SignUpInput } from "./types";

async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;
  else return session.user;
}

async function getUserOrRedirect() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(ROUTES.auth.signIn);
  else return session.user;
}

async function signUp(input: SignUpInput) {
  const { name, email, password } = input;

  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    headers: await headers(),
  });
}

async function signIn(input: SignInInput) {
  const { email, password } = input;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    headers: await headers(),
  });
}

async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}

export const service = {
  getCurrentUser,
  getUserOrRedirect,
  signUp,
  signIn,
  signOut,
};
