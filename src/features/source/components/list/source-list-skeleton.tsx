import { Card, CardAction, CardHeader } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function SourceListSkeleton() {
  return (
    <div className="space-y-0.5 p-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-6 w-3/5 max-w-lg" />

            <div className="mt-1 space-y-1">
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-4/5 max-w-xl" />
            </div>

            <CardAction className="flex items-center gap-2">
              <Skeleton className="h-4.5 w-18 rounded-sm" />
              <Skeleton className="h-8 w-8" />
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
