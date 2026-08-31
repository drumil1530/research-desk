import { redirect } from "next/navigation";

import AppShell from "@/components/layout/app-shell";
import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";

export const instant = false;

export default async function AppLayout({ children }: LayoutProps<"/">) {
  if (!(await authService.getCurrentUser())) redirect(appRoutes.auth.signIn);

  return <AppShell>{children}</AppShell>;
}
