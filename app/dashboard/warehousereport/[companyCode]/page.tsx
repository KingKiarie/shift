"use client";

import { useEffect, useState } from "react";
import { decodeJWT } from "@/lib/decodeJwt";
import { Pagination } from "@/(components)/pagination/pagination";
import { useWarehouses } from "@/lib/hooks/useWarehouse";
import {
  Search,
  Filter,
  Warehouse as WarehouseIcon,
  AlertCircle,
} from "lucide-react";

interface Warehouse {
  svID: number;
  whseid: number;
  whseCode: string;
  whseName: string;
}

export default function WarehouseReport() {
  const user = decodeJWT();
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<"ALL" | "CODE" | "NAME">("ALL");
  const [sortBy, setSortBy] = useState<"id" | "code" | "name">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: warehouses = [],
    isLoading,
    error,
  } = useWarehouses(user?.companyCode);

  const itemsPerPage = 10;

  const filteredAndSortedWarehouses = warehouses
    .filter((warehouse) => {
      if (searchTerm === "") return true;

      const searchLower = searchTerm.toLowerCase();

      switch (filterBy) {
        case "CODE":
          return warehouse.whseCode.toLowerCase().includes(searchLower);
        case "NAME":
          return warehouse.whseName.toLowerCase().includes(searchLower);
        case "ALL":
        default:
          return (
            warehouse.whseCode.toLowerCase().includes(searchLower) ||
            warehouse.whseName.toLowerCase().includes(searchLower) ||
            warehouse.svID.toString().includes(searchTerm)
          );
      }
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "id":
          comparison = a.svID - b.svID;
          break;
        case "code":
          comparison = a.whseCode.localeCompare(b.whseCode);
          break;
        case "name":
          comparison = a.whseName.localeCompare(b.whseName);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = filteredAndSortedWarehouses.slice(startIdx, endIdx);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, sortBy, sortOrder]);

  const formatWarehouseDataForExport = (data: Warehouse[]) => {
    return data.map((warehouse) => ({
      "Warehouse ID": warehouse.svID,
      "Warehouse Code": warehouse.whseCode,
      "Warehouse Name": warehouse.whseName,
      Company: user?.companyCode || "N/A",
    }));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isLoading) {
    return (
      <section className="w-full h-screen">
        <div className="max-w-[90%] mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-screen">
        <div className="max-w-[90%] mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Warehouses
            </h3>
            <p className="text-red-600">
              Failed to load warehouse data. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (warehouses.length === 0) {
    return (
      <section className="w-full h-screen">
        <div className="max-w-[90%] mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <WarehouseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Warehouses Found
            </h3>
            <p className="text-gray-500">
              No warehouse data available for this company.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="h-auto w-full space-y-6 ">
      <div className="max-w-[90%] mx-auto h-auto py-12 flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4  ">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-6">
            <div className="w-full flex flex-col gap-1 itesm-start justify-start">
              <h2 className="text-2xl font-bold text-gray-900">
                Warehouse Report
              </h2>
              <p className="text-gray-600 mt-1">
                {warehouses.length} warehouse
                {warehouses.length !== 1 ? "s" : ""} found for{" "}
                {user?.companyCode}
              </p>
            </div>

            <div className="flex flex-col md:flex-col gap-2 items-end pt-6">
              <div className="flex flex-row space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search warehouses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterBy}
                    onChange={(e) =>
                      setFilterBy(e.target.value as "ALL" | "CODE" | "NAME")
                    }
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="ALL">Search All</option>
                    <option value="CODE">Code Only</option>
                    <option value="NAME">Name Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => {
                setSortBy("id");
                setSortOrder(
                  sortBy === "id" && sortOrder === "asc" ? "desc" : "asc"
                );
              }}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                sortBy === "id"
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sort by ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => {
                setSortBy("code");
                setSortOrder(
                  sortBy === "code" && sortOrder === "asc" ? "desc" : "asc"
                );
              }}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                sortBy === "code"
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sort by Code{" "}
              {sortBy === "code" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => {
                setSortBy("name");
                setSortOrder(
                  sortBy === "name" && sortOrder === "asc" ? "desc" : "asc"
                );
              }}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                sortBy === "name"
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sort by Name{" "}
              {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </div>

          {filteredAndSortedWarehouses.length !== warehouses.length && (
            <p className="text-sm text-gray-500 mb-4">
              Showing {filteredAndSortedWarehouses.length} of{" "}
              {warehouses.length} warehouses
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto" id="warehouse-table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warehouse ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warehouse Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warehouse Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((warehouse) => (
                    <tr
                      key={warehouse.svID}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <WarehouseIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {warehouse.svID}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {warehouse.whseCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {warehouse.whseName}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No warehouses match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAndSortedWarehouses.length === 0 && warehouses.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 mb-4">
              No warehouses match your current search and filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterBy("ALL");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {filteredAndSortedWarehouses.length > itemsPerPage && (
          <div className="w-full max-w-[80%] mx-auto py-8 flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredAndSortedWarehouses.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-center w-full">
            <div className="hidden">
              <span className="font-semibold">Company:</span>{" "}
              {user?.companyCode}
            </div>
            <div className="hidden">
              <span className="font-semibold">Total Warehouses:</span>{" "}
              {warehouses.length}
            </div>
            <div>
              <span className="font-semibold">Current Page:</span> {currentPage}{" "}
              of {Math.ceil(filteredAndSortedWarehouses.length / itemsPerPage)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
