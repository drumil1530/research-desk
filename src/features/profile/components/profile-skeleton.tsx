import { Card, CardFrame, CardPanel } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <CardFrame>
      <Card>
        <CardPanel className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardPanel>
      </Card>
    </CardFrame>
  );
}
