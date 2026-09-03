import { ChevronsLeft, ChevronsRight } from "lucide-react";

import {
  Pagination as CossPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/coss/ui/pagination";

type PaginationProps = {
  page: number;
  totalPages: number;
  defaultPageHref: string;
  getPageHref: (page: number) => string;
};

export default function Pagination({
  page,
  totalPages,
  defaultPageHref,
  getPageHref,
}: PaginationProps) {
  const pages = getPageNumbers(page, totalPages);

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <CossPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={isFirstPage ? defaultPageHref : getPageHref(1)}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={isFirstPage ? "pointer-events-none opacity-50" : undefined}
          >
            <ChevronsLeft />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={getPageHref(page - 1)}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={isFirstPage ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink href={getPageHref(pageNumber)} isActive={pageNumber === page}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={getPageHref(page + 1)}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={isLastPage ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={getPageHref(totalPages)}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={isLastPage ? "pointer-events-none opacity-50" : undefined}
          >
            <ChevronsRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </CossPagination>
  );
}

function getPageNumbers(page: number, totalPages: number) {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page === 1) return [1, 2, 3];
  if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];

  return [page - 1, page, page + 1];
}
