import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

export function ResearchSummaryEmpty() {
  return (
    <Empty className="p-6 md:p-8">
      <EmptyHeader>
        <EmptyTitle>No summary yet</EmptyTitle>
        <EmptyDescription>
          Add a summary to capture what you’ve learned from this research
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
