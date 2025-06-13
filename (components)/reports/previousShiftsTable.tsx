"use client";

import { usePreviousShifts } from "@/lib/hooks/usePreviousShifts";
import { useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PreviousShiftsTableProps {
  companyCode?: string;
  userID?: string;
}

export default function PreviousShiftsTable({
  companyCode,
  userID,
}: PreviousShiftsTableProps) {
  const { data, isLoading, error, refetch } = usePreviousShifts(
    companyCode,
    userID
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OPEN" | "CLOSE">(
    "ALL"
  );
  const [sortBy, setSortBy] = useState<"date" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const calculateDuration = (start: string, end: string | null) => {
    if (!end) return "Ongoing";

    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  };

  const filteredAndSortedShifts =
    data?.shiftList
      ?.filter((shift) => {
        const matchesSearch = shift.shiftID
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || shift.shiftStatus === statusFilter;
        return matchesSearch && matchesStatus;
      })
      ?.sort((a, b) => {
        let comparison = 0;

        if (sortBy === "date") {
          comparison =
            new Date(a.shiftStart).getTime() - new Date(b.shiftStart).getTime();
        } else if (sortBy === "status") {
          comparison = a.shiftStatus.localeCompare(b.shiftStatus);
        }

        return sortOrder === "asc" ? comparison : -comparison;
      }) || [];

  if (isLoading) {
    return (
      <div className="w-full h-screen">
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
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Shifts
          </h3>
          <p className="text-red-600 mb-4">
            {error instanceof Error
              ? error.message
              : "Failed to load previous shifts"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data?.shiftList || data.shiftList.length === 0) {
    return (
      <div className="w-full h-screen lg:h-auto flex flex-col items-center justify-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 space-y-4 w-full text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Previous Shifts
          </h3>
          <p className="text-gray-500">No shift history found for this user.</p>
          <div className="w-full items-center justify-center flex">
            <Link
              href={`/dashboard/user/get-users/${companyCode}`}
              className="cursor-pointer"
            >
              <button className="px-4 py-2 md:px-6 md:py-3 font-bold text-gray-500 flex space-x-2 items-center justify-center rounded-full border-[1px] curso-pointer ">
                <ArrowLeft className="w-4 h-4" />
                <p>Go to users</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6  h-screen lg:h-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Previous Shifts
            </h2>
            <p className="text-gray-600 mt-1">
              {data.shiftList.length} shift
              {data.shiftList.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Shift ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "ALL" | "OPEN" | "CLOSE")
                }
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSE">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => {
              setSortBy("date");
              setSortOrder(
                sortBy === "date" && sortOrder === "desc" ? "asc" : "desc"
              );
            }}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              sortBy === "date"
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sort by Date{" "}
            {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
          </button>
          <button
            onClick={() => {
              setSortBy("status");
              setSortOrder(
                sortBy === "status" && sortOrder === "desc" ? "asc" : "desc"
              );
            }}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              sortBy === "status"
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sort by Status{" "}
            {sortBy === "status" && (sortOrder === "desc" ? "↓" : "↑")}
          </button>
        </div>

        {filteredAndSortedShifts.length !== data.shiftList.length && (
          <p className="text-sm text-gray-500 mb-4">
            Showing {filteredAndSortedShifts.length} of {data.shiftList.length}{" "}
            shifts
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ShiftID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                {loadingButton && (
                  <tr className="fixed inset-0 bg-gray-50 bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="md:px-6 md:py-4 rounded text-lg font-medium">
                      {loadingMessage}
                    </div>
                  </tr>
                )}
              </tr>
              {filteredAndSortedShifts.map((shift) => (
                <tr
                  key={shift.shiftID}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {shift.shiftID}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        shift.shiftStatus === "OPEN"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {shift.shiftStatus === "OPEN" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {shift.shiftStatus === "OPEN" ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(shift.shiftStart)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shift.shiftEnd ? (
                      formatDate(shift.shiftEnd)
                    ) : (
                      <span className="text-green-600 font-medium">
                        Ongoing
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={
                        shift.shiftEnd
                          ? "text-gray-900"
                          : "text-green-600 font-medium"
                      }
                    >
                      {calculateDuration(shift.shiftStart, shift.shiftEnd)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setLoadingButton(`summary-${shift.shiftID}`);
                          setLoadingMessage("Loading summary...");
                          router.push(
                            `/dashboard/shift/shift-sales-summary/${shift.shiftID}/${companyCode}/${userID}`
                          );
                        }}
                        className="text-blue-600 hover:text-blue-900 font-medium transition-colors disabled:opacity-50"
                        disabled={loadingButton === `summary-${shift.shiftID}`}
                      >
                        {loadingButton === `summary-${shift.shiftID}`
                          ? "Loading..."
                          : "View Summary"}
                      </button>

                      {shift.shiftStatus && (
                        <button
                          onClick={() => {
                            setLoadingButton(`report-${shift.shiftID}`);
                            setLoadingMessage("Loading report...");
                            router.push(
                              `/dashboard/shift/shift-report/${shift.shiftID}/${companyCode}/${userID}`
                            );
                          }}
                          className="text-green-600 hover:text-green-900 font-medium transition-colors disabled:opacity-50"
                          disabled={loadingButton === `report-${shift.shiftID}`}
                        >
                          {loadingButton === `report-${shift.shiftID}`
                            ? "Loading..."
                            : "View Report"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedShifts.length === 0 && data.shiftList.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Results Found
          </h3>
          <p className="text-gray-500 mb-4">
            No shifts match your current search and filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("ALL");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
