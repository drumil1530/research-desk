import { Card, CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function LatestResearchesSkeleton() {
  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>
          <Skeleton className="h-5 w-36" />
        </CardFrameTitle>

        <CardFrameAction>
          <Skeleton className="h-5 w-16" />
        </CardFrameAction>
      </CardFrameHeader>

      <Card>
        <div className="flex flex-col gap-3 p-4 md:px-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </div>
      </Card>
    </CardFrame>
  );
}
