"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/coss/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-muted">
          <AlertTriangle className="size-6" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>

        <p className="mt-2 text-muted-foreground">We couldn’t load this page. Please try again.</p>

        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </div>
    </main>
  );
}
