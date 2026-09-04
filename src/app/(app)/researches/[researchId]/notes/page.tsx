import { type Metadata } from "next";
import { Suspense } from "react";

import ResearchNotesSkeleton from "@/features/note/components/list/note-list-skeleton";
import ResearchNoteList from "@/features/note/components/list/research-note-list";

export const metadata: Metadata = {
  title: "Notes",
  description: "View and manage notes for this research.",
};

export default function ResearchNotesPage({ params }: PageProps<"/researches/[researchId]/notes">) {
  return (
    <Suspense fallback={<ResearchNotesSkeleton />}>
      <ResearchNoteList params={params} />
    </Suspense>
  );
}
