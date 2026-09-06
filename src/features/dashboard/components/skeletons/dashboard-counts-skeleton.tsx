import { PageContent } from "@/components/core/page";
import { Card } from "@/coss/ui/card";
import { Skeleton } from "@/coss/ui/skeleton";

export default function DashboardCountsSkeleton() {
  return (
    <PageContent>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <div className="grid gap-2 p-4 md:p-6">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-12" />
            </div>
          </Card>
        ))}
      </div>
    </PageContent>
  );
}
