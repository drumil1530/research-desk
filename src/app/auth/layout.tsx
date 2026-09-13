import { redirect } from "next/navigation";

import { LogoMark, LogoText } from "@/components/icons/logo";
import { authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";

export const instant = false;

export default async function AuthLayout({ children }: LayoutProps<"/auth">) {
  if (await authService.getCurrentUser()) redirect(ROUTES.researchList);

  return (
    <main className="flex min-h-svh flex-col">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-5">
          <div className="flex items-end justify-center gap-2">
            <LogoMark className="size-10" /> <LogoText className="text-2xl" />
          </div>
          {children}
        </div>
      </div>

      <footer className="px-6 py-4 text-center text-xs text-muted-foreground">
        © 2026 Research Desk
      </footer>
    </main>
  );
}
