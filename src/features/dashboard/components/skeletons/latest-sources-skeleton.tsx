import { Card, CardFrame, CardFrameAction, CardFrameHeader, CardFrameTitle } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function LatestSourcesSkeleton() {
  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>
          <Skeleton className="h-5 w-32" />
        </CardFrameTitle>

        <CardFrameAction>
          <Skeleton className="h-5 w-16" />
        </CardFrameAction>
      </CardFrameHeader>

      <Card>
        <div className="flex flex-col gap-3 p-4 md:px-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="grid gap-1">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-3.5 w-2/5" />
            </div>
          ))}
        </div>
      </Card>
    </CardFrame>
  );
}
