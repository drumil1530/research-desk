import { Search, SearchIcon } from "lucide-react";

import Pagination from "@/components/core/pagination";
import { Button } from "@/coss/ui/button";
import { Form } from "@/coss/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/coss/ui/input-group";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import ROUTES from "@/shared/routes";

import ResearchCard from "./research-card";
import { ResearchEmpty, ResearchSearchEmpty } from "./research-empty";

type ResearchListProps = {
  pageProps: PageProps<"/researches" | "/researches/page/[number]">;
};

export default async function ResearchList({ pageProps }: ResearchListProps) {
  const resolvedParams = await pageProps.params;
  const page = "number" in resolvedParams ? Number(resolvedParams.number) : 1;
  const search = (await pageProps.searchParams)["search"]?.toString().trim().toLowerCase();

  const { id: userId } = await authService.getUserOrRedirect();
  const { researches, totalPages } = await service.research.list({ userId, page, search });

  function getResearchPageHref(page: number) {
    const href = page === 1 ? ROUTES.researchList : ROUTES.researchListPage(page);
    if (!search) return href;

    const params = new URLSearchParams({ search });

    return `${href}?${params}`;
  }

  return (
    <div className="grid gap-4">
      {researches.length === 0 && !search ? (
        <ResearchEmpty />
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
                placeholder="Search research..."
                className="[&_input]:h-9 [&_input]:sm:h-8"
              />
            </InputGroup>
            <Button type="submit">
              <Search />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </Form>

          {researches.length === 0 && search ? (
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
