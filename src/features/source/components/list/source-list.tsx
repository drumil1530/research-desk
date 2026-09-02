import { ExternalLinkIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { Page, PageActions, PageContent, PageHeader, PageTitle } from "@/components/core/page";
import { Badge } from "@/coss/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/coss/ui/card";
import { researchIdSchema } from "@/features/research/schemas";
import { sourceTypes } from "@/features/source/contants";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";

import CreateSourceDialog from "../create/create-source-dialog";

import SourceActions from "./source-action";
import SourceEmpty from "./source-empty";

type SourceListProps = {
  params: PageProps<"/research/[researchId]/sources">["params"];
};

export default async function SourceList({ params }: SourceListProps) {
  const { id: userId } = await authService.getUserOrRedirect();
  const { researchId } = await params;

  const result = researchIdSchema.safeParse(researchId);
  if (!result.success) notFound();

  const research = await service.research.sourceList({ id: result.data, userId });
  if (!research) notFound();

  return (
    <Page>
      <PageHeader className="flex-row justify-between items-center">
        <PageTitle>Sources ({research._count.sources})</PageTitle>

        <PageActions>
          <CreateSourceDialog researchId={research.id} />
        </PageActions>
      </PageHeader>

      <PageContent className="flex flex-col gap-2">
        {research.sources.length === 0 ? (
          <Card>
            <SourceEmpty />
          </Card>
        ) : (
          research.sources.map((source) => (
            <Card key={source.id}>
              <CardHeader className="grid-cols-1">
                <CardTitle
                  className="text-base hover:underline underline-offset-4 leading-relaxed"
                  render={<a href={source.url} target="_blank" rel="noopener noreferrer" />}
                >
                  {source.title}
                  <ExternalLinkIcon className="ml-1 inline size-3.5 opacity-60" />
                </CardTitle>

                {source.description && (
                  <CardDescription className="col-span-2 mt-1 text-sm text-muted-foreground line-clamp-2">
                    {source.description}
                  </CardDescription>
                )}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    <Badge variant="secondary">
                      {sourceTypes.find((type) => type.value === source.type)?.label || source.type}
                    </Badge>

                    <Badge variant="outline">Notes {source._count.notes}</Badge>
                  </div>

                  <SourceActions source={source} />
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </PageContent>
    </Page>
  );
}
