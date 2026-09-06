import { Blend, Search, SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";

import Pagination from "@/components/core/pagination";
import { Button } from "@/coss/ui/button";
import { Form } from "@/coss/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/coss/ui/input-group";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/coss/ui/select";
import {
  type ListResearchesFilterInput,
  listResearchesFilterSchema,
} from "@/features/research/schemas";
import { type ResearchStatus } from "@/generated/prisma/enums";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";
import { type SelectList } from "@/shared/types/coss";

import ResearchCard from "./research-card";
import { ResearchEmpty, ResearchSearchEmpty } from "./research-empty";

type ResearchListProps = {
  pageProps: PageProps<"/researches" | "/researches/page/[number]">;
};

function toResearchStatus(status: ListResearchesFilterInput["status"]): ResearchStatus | "ALL" {
  switch (status) {
    case "all":
      return "ALL";
    case "active":
      return "ACTIVE";
    case "completed":
      return "COMPLETED";
  }
}

export default async function ResearchList({ pageProps }: ResearchListProps) {
  const resolvedParams = await pageProps.params;
  const page = "number" in resolvedParams ? Number(resolvedParams.number) : 1;

  const filterResult = listResearchesFilterSchema.safeParse(await pageProps.searchParams);
  if (!filterResult.success) redirect(getResearchPageHref(1, { status: "active" }));

  const { search, status } = filterResult.data;

  const { id: userId } = await authService.getUserOrRedirect();
  const { researches, totalPages } = await service.research.list({
    userId,
    page,
    search,
    status: toResearchStatus(status),
  });

  function getResearchPageHref(page: number, filters?: ListResearchesFilterInput) {
    const { search, status } = filters || filterResult.data!;

    const href = page === 1 ? ROUTES.researchList : ROUTES.researchListPage(page);
    const params = new URLSearchParams({
      ...(search && { search }),
      status,
    });

    return `${href}?${params}`;
  }

  return (
    <div className="grid gap-4">
      {researches.length === 0 && !search && status === "all" ? (
        <ResearchEmpty />
      ) : (
        <>
          <FiltersForm search={search} status={status} />

          {researches.length === 0 && (search || status !== "all") ? (
            <ResearchSearchEmpty />
          ) : (
            researches.map((research) => <ResearchCard key={research.id} research={research} />)
          )}

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              defaultPageHref={getResearchPageHref(1)}
              getPageHref={getResearchPageHref}
            />
          )}
        </>
      )}
    </div>
  );
}

const statuses = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
] satisfies SelectList<ListResearchesFilterInput["status"]>;

function FiltersForm({ search, status }: ListResearchesFilterInput) {
  return (
    <Form method="GET" className="flex flex-wrap sm:flex-nowrap gap-1.5">
      <InputGroup className="grow">
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>

        <InputGroupInput
          aria-label="Search"
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search research..."
          className="[&_input]:h-9 [&_input]:sm:h-8"
        />
      </InputGroup>

      <Select aria-label="Select status" defaultValue={status} items={statuses} name="status">
        <SelectTrigger className="w-39">
          <Blend />
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {statuses.map(({ label, value }) => (
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
