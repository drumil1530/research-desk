import { BookType, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

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
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/coss/ui/select";
import { researchIdSchema } from "@/features/research/schemas";
import { sourceTypes } from "@/features/source/contants";
import {
  listResearchSourcesFiltersSchema,
  type ListResearchSourcesInput,
} from "@/features/source/schemas";
import { type SourceType } from "@/generated/prisma/enums";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";
import { type SelectList } from "@/shared/types/coss";

import CreateSourceDialog from "../create/create-source-dialog";

import SourceActions from "./source-action";
import { SourceEmpty, SourceSearchEmpty } from "./source-empty";

type SourceListProps = {
  pageProps: PageProps<
    "/researches/[researchId]/sources" | "/researches/[researchId]/sources/page/[number]"
  >;
};

function toSourceType(type: ListResearchSourcesInput["type"]): SourceType | "ALL" {
  switch (type) {
    case "all":
      return "ALL";
    case "article":
      return "ARTICLE";
    case "documentation":
      return "DOCUMENTATION";
    case "video":
      return "VIDEO";
    case "repository":
      return "REPOSITORY";
    case "paper":
      return "PAPER";
    case "other":
      return "OTHER";
  }
}

export default async function SourceList({ pageProps }: SourceListProps) {
  const resolvedParams = await pageProps.params;
  const page = "number" in resolvedParams ? Number(resolvedParams.number) : 1;
  const filterResult = listResearchSourcesFiltersSchema.safeParse(await pageProps.searchParams);

  if (!filterResult.success) redirect(getSourcePageHref(1, { type: "all" }));
  const { id: userId } = await authService.getUserOrRedirect();

  const result = researchIdSchema.safeParse(resolvedParams.researchId);
  if (!result.success) notFound();

  const { search, type } = filterResult.data;
  const research = await service.research.sourceList({
    researchId: result.data,
    userId,
    page,
    search,
    type: toSourceType(type),
  });
  if (!research) notFound();

  function getSourcePageHref(page: number, filters?: ListResearchSourcesInput) {
    const { search, type } = filters || filterResult.data!;

    const href =
      page === 1
        ? ROUTES.research(research!.id).sources
        : ROUTES.research(research!.id).sourcePage(page);

    const params = new URLSearchParams({
      ...(search && { search }),
      type,
    });

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
        {research.sources.length === 0 && !search && type === "all" ? (
          <Card>
            <SourceEmpty />
          </Card>
        ) : (
          <>
            <FiltersForm search={search} type={type} />

            {research.sources.length === 0 && (search || type !== "all") ? (
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

const types = [
  { label: "All", value: "all" },
  { label: "Article", value: "article" },
  { label: "Documentation", value: "documentation" },
  { label: "Video", value: "video" },
  { label: "Repository", value: "repository" },
  { label: "Paper", value: "paper" },
  { label: "Other", value: "other" },
] satisfies SelectList<ListResearchSourcesInput["type"]>;

function FiltersForm({ search, type }: ListResearchSourcesInput) {
  return (
    <Form method="GET" className="flex flex-wrap sm:flex-nowrap gap-1.5">
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

      <Select aria-label="Select source type" defaultValue={type} items={types} name="type">
        <SelectTrigger className="w-39">
          <BookType />
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {types.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <Button type="submit" className="ms-auto">
        <Search />
        <span>Search</span>
      </Button>
    </Form>
  );
}
