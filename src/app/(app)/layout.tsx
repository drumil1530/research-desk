import { getCurrentUser } from "@/infrastructure/auth/internal/services";
import appRoutes from "@/shared/app-routes";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  if (!(await getCurrentUser())) redirect(appRoutes.auth.signIn);

  return children;
}
