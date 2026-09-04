import { redirect } from "next/navigation";

import AppShell from "@/components/layout/app-shell";
import { authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";

export const instant = false;

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await authService.getCurrentUser();
  if (!user) redirect(ROUTES.auth.signIn);

  return <AppShell user={user}>{children}</AppShell>;
}
