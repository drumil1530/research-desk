import { PropsWithChildren } from "react";
import { TooltipProvider as Provider } from "../ui/tooltip";

export default function TooltipProvider({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
