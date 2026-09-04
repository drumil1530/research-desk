import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

export function SourceEmpty() {
  return (
    <Empty className="p-6 md:p-8">
      <EmptyHeader>
        <EmptyTitle>No sources yet</EmptyTitle>
        <EmptyDescription>
          Add sources to keep track of the material you&apos;re researching.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function SourceSearchEmpty() {
  return (
    <Empty className="p-6 md:p-8">
      <EmptyHeader>
        <EmptyTitle>No sources found</EmptyTitle>
        <EmptyDescription>
          No sources match your search. Try a different search term.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
