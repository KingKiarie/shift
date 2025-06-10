"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ShiftSalesSummaryComponent } from "@/(components)/reports/ShiftSalesSummary";
import { ExportButton } from "@/(components)/common/exportButton";
import { useSalesSummary } from "@/lib/hooks/useShiftSalesSummary";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ShiftSalesSummaryPage() {
  const params = useParams();
  const shiftID = params.shiftId as string;
  const companyCode = params.companyCode as string;
  const userID = params.userId as string;

  const {
    data: summary,
    isLoading,
    error,
  } = useSalesSummary(shiftID, companyCode, userID);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 w-full h-screen">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-200 border border-gray-400 rounded-lg flex items-center gap-2 text-gray-800">
        <AlertCircle size={20} />
        Failed to load sales summary
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-4 bg-gray-200 border border-gray-400 rounded-lg text-gray-800">
        No sales summary available for this shift.
      </div>
    );
  }

  return (
    <section className="h-auto">
      <div className="max-w-[95%] mx-auto py-12 flex flex-col space-y-4">
        <div className="w-full flex items-start justify-between">
          <div className="flex space-x-2 underline underline-offset-4">
            <ArrowLeft className="h-6 w-6 text-gray-800" />
            <Link
              className="cursor-pointer text-gray-800 hover:text-gray-600"
              href={`/dashboard/shift/previous-shifts/${companyCode}/${userID}`}
            >
              Previous Shifts
            </Link>
          </div>
          <ExportButton
            summaryData={summary}
            fileName={`sales-summary-${summary.shiftDetails[0]?.shiftID}`}
            type="sales"
          />
        </div>
        <ShiftSalesSummaryComponent summary={summary} />
      </div>
    </section>
  );
}
