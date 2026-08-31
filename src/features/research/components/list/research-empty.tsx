import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

export default function ResearchEmpty() {
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
