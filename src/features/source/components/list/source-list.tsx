import { ExternalLinkIcon, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Page,
  PageActions,
  PageBreadcrumb,
  PageContent,
  PageHeader,
  PageTitle,
} from "@/components/core/page";
import Pagination from "@/components/core/pagination";
import { Badge } from "@/coss/ui/badge";
import { Button } from "@/coss/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/coss/ui/card";
import { Form } from "@/coss/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/coss/ui/input-group";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/coss/ui/menu";
import { researchIdSchema } from "@/features/research/schemas";
import { sourceTypes } from "@/features/source/contants";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import CreateSourceDialog from "../create/create-source-dialog";

import SourceActions from "./source-action";
import { SourceEmpty, SourceSearchEmpty } from "./source-empty";

type SourceListProps = {
  pageProps: PageProps<
    "/researches/[researchId]/sources" | "/researches/[researchId]/sources/page/[number]"
  >;
};

export default async function SourceList({ pageProps }: SourceListProps) {
  const resolvedParams = await pageProps.params;
  const page = "number" in resolvedParams ? Number(resolvedParams.number) : 1;
  const search = (await pageProps.searchParams)["search"]?.toString().trim().toLowerCase();

  const { id: userId } = await authService.getUserOrRedirect();

  const result = researchIdSchema.safeParse(resolvedParams.researchId);
  if (!result.success) notFound();

  const research = await service.research.sourceList({ id: result.data, userId, page, search });
  if (!research) notFound();

  function getSourcePageHref(page: number) {
    const href =
      page === 1
        ? ROUTES.research(research!.id).sources
        : ROUTES.research(research!.id).sourcePage(page);

    if (!search) return href;

    const params = new URLSearchParams({ search });

    return `${href}?${params}`;
  }

  return (
    <Page>
      <PageBreadcrumb
        items={[
          { label: "Researches", href: ROUTES.researchList },
          {
            label: research.title,
            href: ROUTES.research(research.id).detail,
          },
          {
            page: (
              <Menu>
                <MenuTrigger
                  render={
                    <Button
                      className="-mx-1.25 -my-1.5 sm:-ms-2 text-sm h-6 px-1 sm:px-2"
                      variant="ghost"
                      size="sm"
                    />
                  }
                >
                  Sources
                </MenuTrigger>
                <MenuPopup align="start">
                  <MenuItem
                    render={<Link href={ROUTES.research(research.id).notes} />}
                    className="cursor-pointer text-sm"
                  >
                    Notes
                  </MenuItem>
                </MenuPopup>
              </Menu>
            ),
          },
        ]}
      />
      <PageHeader className="flex-row justify-between items-center">
        <PageTitle>Sources ({research.totalSources})</PageTitle>

        <PageActions>
          <CreateSourceDialog researchId={research.id} />
        </PageActions>
      </PageHeader>

      <PageContent className="flex flex-col gap-2">
        {research.sources.length === 0 && !search ? (
          <Card>
            <SourceEmpty />
          </Card>
        ) : (
          <>
            <Form method="GET" className="flex gap-1.5">
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon aria-hidden="true" />
                </InputGroupAddon>

                <InputGroupInput
                  aria-label="Search"
                  type="search"
                  name="search"
                  defaultValue={search}
                  placeholder="Search sources..."
                  className="[&_input]:h-9 [&_input]:sm:h-8"
                />
              </InputGroup>
              <Button type="submit">
                <Search />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </Form>
            {research.sources.length === 0 && search ? (
              <Card>
                <SourceSearchEmpty />
              </Card>
            ) : (
              research.sources.map((source) => (
                <Card key={source.id}>
                  <CardHeader className="grid-cols-1">
                    <CardTitle
                      className="text-base hover:underline underline-offset-4 leading-relaxed"
                      render={<Link href={ROUTES.research(source.researchId).source(source.id)} />}
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
                          {sourceTypes.find((type) => type.value === source.type)?.label ||
                            source.type}
                        </Badge>

                        <Badge variant="outline">Notes {source._count.notes}</Badge>
                      </div>

                      <SourceActions source={source} />
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </>
        )}
      </PageContent>

      {research.totalSourcePages > 1 && (
        <Pagination
          page={page}
          totalPages={research.totalSourcePages}
          defaultPageHref={getSourcePageHref(1)}
          getPageHref={getSourcePageHref}
        />
      )}
    </Page>
  );
}
