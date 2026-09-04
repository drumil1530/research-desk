import Link from "next/link";

import { Logo } from "@/components/icons/logo";
import { Button } from "@/coss/ui/button";
import { authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";

export const instant = false;

export default async function HomePage() {
  const user = await authService.getCurrentUser();

  return (
    <>
      <header className="flex items-center justify-between px-6 py-5">
        <Logo />

        <Button
          variant="ghost"
          render={<Link href={user ? ROUTES.researchList : ROUTES.auth.signIn} />}
        >
          {user ? "Researches" : "Sign in"}
        </Button>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Turn questions into organized research.
            </h1>

            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Keep your sources, notes, and findings together while you work through a question.
            </p>
          </div>

          <Button
            className="mt-8"
            size="lg"
            render={<Link href={user ? ROUTES.researchList : ROUTES.auth.signUp} />}
          >
            {user ? "Go to Researches" : "Get started"}
          </Button>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Question</span>
            <span aria-hidden="true">→</span>
            <span>Sources</span>
            <span aria-hidden="true">→</span>
            <span>Notes</span>
            <span aria-hidden="true">→</span>
            <span>Summary</span>
          </div>
        </div>
      </div>

      <footer className="px-6 py-4 text-center text-xs text-muted-foreground">
        © 2026 Research Desk
      </footer>
    </>
  );
}
