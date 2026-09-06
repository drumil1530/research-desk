import { PageContent } from "@/components/core/page";
import { Card, CardPanel } from "@/coss/ui/card";
import { service } from "@/infrastructure/database";

type DashboardCountsProps = {
  userId: string;
};

export default async function DashboardCounts({ userId }: DashboardCountsProps) {
  const counts = await service.dashboard.getCounts({ userId });

  return (
    <PageContent>
      <div className="grid gap-4 sm:grid-cols-3">
        <CountCard label="Researches" count={counts.researches} />
        <CountCard label="Sources" count={counts.sources} />
        <CountCard label="Notes" count={counts.notes} />
      </div>
    </PageContent>
  );
}

function CountCard({ label, count }: { label: string; count: number }) {
  return (
    <Card>
      <CardPanel>
        <div className="grid gap-1">
          <span className="text-muted-foreground text-sm">{label}</span>
          <span className="text-2xl font-semibold tracking-tight">{count}</span>
        </div>
      </CardPanel>
    </Card>
  );
}
