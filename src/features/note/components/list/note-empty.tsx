import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

export default function NoteEmpty() {
  return (
    <Empty className="p-6 md:p-8">
      <EmptyHeader>
        <EmptyTitle>No notes yet</EmptyTitle>
        <EmptyDescription>
          Add notes to keep track of the material you&apos;re researching.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
