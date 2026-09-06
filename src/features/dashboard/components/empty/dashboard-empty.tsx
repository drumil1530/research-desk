import Link from "next/link";

import { Button } from "@/coss/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/coss/ui/empty";

type LinkProp = {
  link: string;
};

export function LatestActiveResearchesEmpty({ link }: LinkProp) {
  return (
    <Empty className="py-8 md:py-10">
      <EmptyHeader>
        <EmptyTitle>No active research</EmptyTitle>
        <EmptyDescription>Your active researches will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Link href={link}>View researches</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function LatestCompletedResearchesEmpty({ link }: LinkProp) {
  return (
    <Empty className="py-8 md:py-10">
      <EmptyHeader>
        <EmptyTitle>No completed research</EmptyTitle>
        <EmptyDescription>Your completed researches will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Link href={link}>View researches</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function LatestUpdatedSourcesEmpty() {
  return (
    <Empty className="py-8 md:py-10">
      <EmptyHeader>
        <EmptyTitle>No updated sources</EmptyTitle>
        <EmptyDescription>Sources you add and update will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export function LatestUpdatedNotesEmpty() {
  return (
    <Empty className="py-8 md:py-10">
      <EmptyHeader>
        <EmptyTitle>No updated notes</EmptyTitle>
        <EmptyDescription>Notes you add and update will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
