import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

export default function SourceEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No sources yet</EmptyTitle>
        <EmptyDescription>
          Add sources to keep track of the material you&apos;re researching.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
