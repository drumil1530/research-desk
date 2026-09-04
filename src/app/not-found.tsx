import { BookOpen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/coss/ui/button";
import ROUTES from "@/shared/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-muted">
          <BookOpen className="size-6" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>

        <p className="mt-2 text-muted-foreground">
          The page you’re looking for doesn’t exist or is no longer available.
        </p>

        <Button render={<Link href={ROUTES.home}>Back to Home</Link>} className="mt-6" />
      </div>
    </main>
  );
}
