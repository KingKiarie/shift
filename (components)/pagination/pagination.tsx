"use client";

import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage = 12,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages < 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 md:px-6 md:py-3 lg:py-4 lg:px-8 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        prev
      </button>
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`px-4 py-2 rounded  ${
              currentPage === pageNum
                ? "bg-amber-600 text-black"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 md:px-6 md:py-3 lg:py-4 lg:px-8 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
