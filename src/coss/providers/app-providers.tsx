import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import TooltipProvider from "./tooltip-provider";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
