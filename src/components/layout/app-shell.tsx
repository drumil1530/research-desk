"use client";

import Link from "next/link";
import { type PropsWithChildren } from "react";

import { type authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";

import { Logo } from "../icons/logo";

import { NavUser } from "./nav-user";

type AppShellProps = PropsWithChildren<{
  user: Awaited<ReturnType<typeof authService.getUserOrRedirect>>;
}>;

export default function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center border-b px-4">
        <Link href={ROUTES.dashboard} className="flex items-center gap-2 font-semibold">
          <Logo />
        </Link>

        <div className="ms-auto">
          <NavUser user={user} />
        </div>
      </header>

      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}
