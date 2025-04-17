"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./pagination";

export default function PaginationClient({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mb-4">
      <PaginationContent className="*:cursor-pointer">
        {
          currentPage > 1 &&
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        }
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={createPageURL(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {
          currentPage < totalPages &&
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)}/>
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  );
}
