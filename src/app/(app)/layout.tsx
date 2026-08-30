import { redirect } from "next/navigation";

import { authService } from "@/infrastructure/auth";
import appRoutes from "@/shared/app-routes";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  if (!(await authService.getCurrentUser())) redirect(appRoutes.auth.signIn);

  return children;
}
