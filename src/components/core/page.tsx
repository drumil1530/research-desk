import type { ComponentProps, PropsWithChildren } from "react";

import { cn } from "@/coss/utils";

function Page({ children, className, ...props }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div
      {...props}
      className={cn("mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6", className)}
    >
      {children}
    </div>
  );
}

function PageHeader({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"header">>) {
  return (
    <header
      {...props}
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </header>
  );
}

function PageTitle({ children, className, ...props }: PropsWithChildren<ComponentProps<"h1">>) {
  return (
    <h1 {...props} className={cn("text-xl sm:text-2xl font-semibold", className)}>
      {children}
    </h1>
  );
}

function PageDescription({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"p">>) {
  return (
    <p {...props} className={cn("text-muted-foreground", className)}>
      {children}
    </p>
  );
}

function PageActions({ children, className, ...props }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div {...props} className={cn("flex flex-wrap items-center gap-2", className)}>
      {children}
    </div>
  );
}

function PageContent({ children, className, ...props }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div {...props} className={cn("min-w-0", className)}>
      {children}
    </div>
  );
}

export { Page, PageHeader, PageTitle, PageDescription, PageActions, PageContent };
