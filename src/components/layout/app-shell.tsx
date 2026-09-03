"use client";

import { type PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/coss/ui/sidebar";

import AppSidebar from "./app-sidebar";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 p-4">
          <SidebarTrigger className="-ms-2" />
        </header>

        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
