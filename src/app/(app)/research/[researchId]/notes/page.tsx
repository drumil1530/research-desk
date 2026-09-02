import { Suspense } from "react";

import ResearchNoteList from "@/features/note/components/list/research-note-list";

export default function ResearchNotesPage({ params }: PageProps<"/research/[researchId]/notes">) {
  return (
    <Suspense fallback={null}>
      <ResearchNoteList params={params} />
    </Suspense>
  );
}
