import { Card, CardHeader } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function ResearchListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-5 w-2/5 sm:h-6" />
            <Skeleton className="h-4 w-4/5 sm:w-3/5" />

            <div className="mt-2 flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
