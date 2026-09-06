import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ViewAllLink({ link }: { link: string }) {
  return (
    <Link
      href={link}
      className="text-sm inline-flex items-center gap-1 border-b border-transparent hover:border-current transition-[border-color]"
    >
      View all <ArrowRight className="size-3.5" />
    </Link>
  );
}
