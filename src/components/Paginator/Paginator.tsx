import { useMemo } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { generatePaginationLinks } from './generatePaginationLinks';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
};

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
  showPreviousNext,
}: PaginatorProps) {
  const selectItems = useMemo(() => {
    return new Array(totalPages).fill(0).map((_, i) => (
      <SelectItem key={i} value={(i + 1).toString()}>
        {i + 1}
      </SelectItem>
    ));
  }, [totalPages]);

  return (
    <>
      <Select
        value={currentPage.toString()}
        onValueChange={(page) => onPageChange(parseInt(page))}
      >
        <SelectTrigger className="ml-auto w-[100px] md:hidden">
          <SelectValue placeholder="Page" />
        </SelectTrigger>
        <SelectContent>{selectItems}</SelectContent>
      </Select>

      <Pagination className="hidden md:flex">
        <PaginationContent>
          {showPreviousNext && totalPages ? (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage - 1 < 1}
              />
            </PaginationItem>
          ) : null}
          {generatePaginationLinks(currentPage, totalPages, onPageChange)}
          {showPreviousNext && totalPages ? (
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage > totalPages - 1}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </>
  );
}
