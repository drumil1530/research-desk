import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";

import { Page, PageHeader, PageContent, PageTitle, PageActions } from "@/components/core/page";
import { Badge } from "@/coss/ui/badge";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

import CompleteResearchDialog from "../complete/complete-research-dialog";
import DeleteResearchDialog from "../delete/delete-research-dialog";
import UpdateResearchDialog from "../update/update-research-dialog";

type ResearchDetailProps = {
  params: PageProps<"/research/[id]">["params"];
};

export default async function ResearchDetail({ params }: ResearchDetailProps) {
  const { id: userId } = await authService.getUserOrRedirect();
  const { id } = await params;

  const research = await service.research.getById({
    id,
    userId,
  });

  if (!research) {
    notFound();
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>{research.title}</PageTitle>

        <PageActions>
          <UpdateResearchDialog
            id={research.id}
            title={research.title}
            description={research.description}
          />

          {research.status === "ACTIVE" && <CompleteResearchDialog id={research.id} />}

          <DeleteResearchDialog id={research.id} />

          <Badge variant={research.status === "ACTIVE" ? "default" : "secondary"}>
            {research.status === "ACTIVE" ? "Active" : "Completed"}
          </Badge>
        </PageActions>
      </PageHeader>

      <PageContent>
        {research.description && <p className="whitespace-pre-wrap">{research.description}</p>}
        <time className="text-muted-foreground text-sm" dateTime={research.updatedAt.toISOString()}>
          Updated {formatDistanceToNow(research.updatedAt, { addSuffix: true })}
        </time>
      </PageContent>

      {research.status === "COMPLETED" && (
        <PageContent>
          <h2 className="font-semibold pb-4">Summary</h2>

          <div className="grid gap-2">
            <p className="whitespace-pre-wrap">{research.summary}</p>

            {research.completedAt && (
              <time
                className="text-muted-foreground text-sm"
                dateTime={research.completedAt.toISOString()}
              >
                Completed {formatDistanceToNow(research.completedAt, { addSuffix: true })}
              </time>
            )}
          </div>
        </PageContent>
      )}
    </Page>
  );
}
