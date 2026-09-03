import { Search, SearchIcon } from "lucide-react";

import Pagination from "@/components/core/pagination";
import { Button } from "@/coss/ui/button";
import { Form } from "@/coss/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/coss/ui/input-group";
import { authService } from "@/infrastructure/auth";
import { service } from "@/infrastructure/database";
import appRoutes from "@/shared/app-routes";

import ResearchCard from "./research-card";
import ResearchEmpty from "./research-empty";

type ResearchListProps = {
  page: number;
  search?: string | undefined;
};

export default async function ResearchList({ page, search }: ResearchListProps) {
  const { id: userId } = await authService.getUserOrRedirect();

  const { researches, totalPages } = await service.research.list({ userId, page, search });
  if (researches.length === 0) return <ResearchEmpty />;

  function getResearchPageHref(page: number) {
    const href = page === 1 ? appRoutes.research.list : appRoutes.research.listPage(page);

    if (!search) return href;

    const params = new URLSearchParams({ search });

    return `${href}?${params}`;
  }

  return (
    <div className="grid gap-4">
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

      {researches.map((research) => (
        <ResearchCard key={research.id} research={research} />
      ))}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          defaultPageHref={getResearchPageHref(1)}
          getPageHref={getResearchPageHref}
        />
      )}
    </div>
  );
}
