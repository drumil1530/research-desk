import { redirect } from "next/navigation";

import { Logo } from "@/components/icons/logo";
import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";

export default async function AuthLayout({ children }: LayoutProps<"/auth">) {
  if (await authService.getCurrentUser()) redirect(appRoutes.research.list);

  return (
    <main className="flex min-h-svh flex-col">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-5">
          <Logo className="self-center" />
          {children}
        </div>
      </div>

      <footer className="px-6 py-4 text-center text-xs text-muted-foreground">
        © 2026 Research Desk
      </footer>
    </main>
  );
}
