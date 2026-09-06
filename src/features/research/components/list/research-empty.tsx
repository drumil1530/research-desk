import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

export function ResearchEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No research yet</EmptyTitle>
        <EmptyDescription>
          Start your first research to keep your sources, notes, and findings organized.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function ResearchSearchEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No research found</EmptyTitle>
        <EmptyDescription>
          No research matches your search. Try a different search term or status.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
