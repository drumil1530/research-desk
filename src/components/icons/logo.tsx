import Image from "next/image";

import { cn } from "@/coss/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <>
      <Image
        src={`/brand/mark-128-light.svg`}
        alt="Research Desk"
        width={128}
        height={128}
        className={cn("dark:hidden", className)}
      />

      <Image
        src={`/brand/mark-128-dark.svg`}
        alt="Research Desk"
        width={128}
        height={128}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}

type LogoTextProps = {
  className?: string;
};

export function LogoText({ className }: LogoTextProps) {
  return (
    <span className={cn("text-xl font-semibold tracking-tight", className)}>
      <span>Research</span> <span className="text-muted-foreground">Desk</span>
    </span>
  );
}
