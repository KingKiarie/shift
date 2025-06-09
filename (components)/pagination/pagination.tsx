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
    <div className="w-full flex items-center justify-center gap-2 md:gap-4 lg:gap-6 mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 md:px-6 md:py-3 lg:py-4 lg:px-8 rounded bg-red-400 hover:bg-gray-300 disabled:opacity-50 text-white"
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
                ? "bg-red-300 text-white"
                : "bg-blue-100 hover:bg-blue-400 text-blue-600"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 md:px-6 md:py-3 lg:py-4 lg:px-8 rounded bg-blue-400 hover:bg-gray-300 disabled:opacity-50 text-white"
      >
        Next
      </button>
    </div>
  );
};
