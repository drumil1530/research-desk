"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./tooltip";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <ToggleGroup
      value={mounted && theme ? [theme] : []}
      onValueChange={([value]) => {
        if (value) setTheme(value);
      }}
      disabled={!mounted}
      className="w-full"
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <ToggleGroupItem
              suppressHydrationWarning
              value="light"
              size="sm"
              aria-label="Light theme"
              className="flex-1"
            >
              <Sun className="size-4" />
            </ToggleGroupItem>
          }
        />
        <TooltipPopup>Light</TooltipPopup>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <ToggleGroupItem
              suppressHydrationWarning
              value="dark"
              size="sm"
              aria-label="Dark theme"
              className="flex-1"
            >
              <Moon className="size-4" />
            </ToggleGroupItem>
          }
        />
        <TooltipPopup>Dark</TooltipPopup>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <ToggleGroupItem
              suppressHydrationWarning
              value="system"
              size="sm"
              aria-label="System theme"
              className="flex-1"
            >
              <Monitor className="size-4" />
            </ToggleGroupItem>
          }
        />
        <TooltipPopup>System</TooltipPopup>
      </Tooltip>
    </ToggleGroup>
  );
}
