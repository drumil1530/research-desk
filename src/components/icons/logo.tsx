import { cn } from "@/coss/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("text-xl font-semibold tracking-tight", className)}>
      <span>Research</span> <span className="text-muted-foreground">Desk</span>
    </span>
  );
}
