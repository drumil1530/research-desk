import { Frame, FrameHeader, FramePanel } from "@/coss/ui/frame";
import { Skeleton } from "@/coss/ui/skeleton";

export default function ResearchDetailSkeleton() {
  return (
    <Frame className="mx-auto w-full max-w-5xl">
      <FrameHeader className="flex-row justify-between">
        <Skeleton className="h-8 w-64" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-17.5 rounded-lg" />
          <Skeleton className="h-8 w-27 rounded-lg" />
          <Skeleton className="h-8 w-21.75 rounded-lg" />
          <Skeleton className="h-4.5 w-11 rounded-sm" />
        </div>
      </FrameHeader>

      <FramePanel>
        <div className="grid gap-2">
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-4/5 max-w-xl" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
      </FramePanel>
    </Frame>
  );
}
