import { headers } from "next/headers";

import "server-only";
import { auth } from "./auth";
import { type SignInInput, type SignUpInput } from "./types";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;
  else return session.user;
}

export async function signUp(input: SignUpInput) {
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

export async function signIn(input: SignInInput) {
  const { email, password } = input;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    headers: await headers(),
  });
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
