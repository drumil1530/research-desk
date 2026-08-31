import { Card, CardHeader, CardPanel } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function ResearchListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex justify-between">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-5 w-16" />
          </CardHeader>

          <CardPanel className="grid gap-2">
            <Skeleton className="mt-2 h-4 w-4/5" />
            <Skeleton className="h-4 w-32" />
          </CardPanel>
        </Card>
      ))}
    </div>
  );
}
